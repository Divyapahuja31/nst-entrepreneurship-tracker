import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  publicAssets: [
    {
      dir: "dist/client",
      maxAge: 3600,
    },
  ],
  handlers: [
    {
      route: "/**",
      handler: "./server/routes/[...].ts",
    },
  ],
});
