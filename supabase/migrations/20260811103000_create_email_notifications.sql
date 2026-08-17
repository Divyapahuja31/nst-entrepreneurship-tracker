-- Create ENUMs for status and types if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'email_notification_status') THEN
    CREATE TYPE public.email_notification_status AS ENUM ('PENDING', 'SENT', 'FAILED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'email_notification_type') THEN
    CREATE TYPE public.email_notification_type AS ENUM ('KPI_SCORED_STUDENT', 'CONSECUTIVE_LOW_SCORE_BOARD', 'CONSECUTIVE_MID_SCORE_MENTOR');
  END IF;
END$$;

-- Create email_notifications table
CREATE TABLE IF NOT EXISTS public.email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type public.email_notification_type NOT NULL,
  subject TEXT NOT NULL,
  status public.email_notification_status NOT NULL DEFAULT 'PENDING',
  provider TEXT NOT NULL DEFAULT 'resend',
  provider_message_id TEXT,
  error TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grant select and write permissions to authenticated users and all to service role
GRANT SELECT ON public.email_notifications TO authenticated;
GRANT ALL ON public.email_notifications TO service_role;

-- Enable Row Level Security (RLS)
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admins and super admins can view all email logs
CREATE POLICY "Admins can view all email logs" ON public.email_notifications
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policy: Users can view their own email logs matching their user ID
CREATE POLICY "Users can view own email logs" ON public.email_notifications
  FOR SELECT TO authenticated
  USING (recipient_user_id = auth.uid());
