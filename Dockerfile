# ---------------------------------------------------
# Stage 1: Base image
# ---------------------------------------------------
FROM node:22-alpine AS base
WORKDIR /app

# ---------------------------------------------------
# Stage 2: Install dependencies
# ---------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# ---------------------------------------------------
# Stage 3: Build the application
# ---------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build phase
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV NODE_ENV=production

RUN npm run build

# ---------------------------------------------------
# Stage 4: Production runner
# ---------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 tanstack

# Copy application files and built assets with tanstack user ownership
COPY --chown=tanstack:nodejs --from=builder /app/package.json ./package.json
COPY --chown=tanstack:nodejs --from=builder /app/package-lock.json ./package-lock.json
COPY --chown=tanstack:nodejs --from=builder /app/node_modules ./node_modules
COPY --chown=tanstack:nodejs --from=builder /app/dist ./dist
COPY --chown=tanstack:nodejs --from=builder /app/src ./src
COPY --chown=tanstack:nodejs --from=builder /app/vite.config.ts ./vite.config.ts
COPY --chown=tanstack:nodejs --from=builder /app/tsconfig.json ./tsconfig.json
COPY --chown=tanstack:nodejs --from=builder /app/wrangler.jsonc ./wrangler.jsonc

USER tanstack

EXPOSE 3000

# Start production preview server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]