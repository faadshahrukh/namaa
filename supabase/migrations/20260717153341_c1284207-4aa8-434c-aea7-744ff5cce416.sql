
-- News posts
CREATE TABLE public.news_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Forex',
  author TEXT NOT NULL DEFAULT 'Namaa Team',
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  read_time TEXT NOT NULL DEFAULT '5 min',
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.news_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;

ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published news"
  ON public.news_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated can read all news"
  ON public.news_posts FOR SELECT
  TO authenticated
  USING (true);

-- Tutorial videos
CREATE TABLE public.tutorial_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  level TEXT NOT NULL DEFAULT 'Beginner',
  duration TEXT NOT NULL DEFAULT '10 min',
  instructor TEXT NOT NULL DEFAULT 'Namaa Academy',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tutorial_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tutorial_videos TO authenticated;
GRANT ALL ON public.tutorial_videos TO service_role;

ALTER TABLE public.tutorial_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published tutorials"
  ON public.tutorial_videos FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated can read all tutorials"
  ON public.tutorial_videos FOR SELECT
  TO authenticated
  USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER news_posts_set_updated_at
  BEFORE UPDATE ON public.news_posts
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TRIGGER tutorial_videos_set_updated_at
  BEFORE UPDATE ON public.tutorial_videos
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Seed
INSERT INTO public.news_posts (slug, title, excerpt, content, category, author, image_url, featured, read_time) VALUES
  ('welcome-to-namaa','Welcome to Namaa Markets','Your trusted source for forex intelligence, education, and broker research.','Namaa Markets is dedicated to bringing traders verified broker reviews, live market data, and quality education. Stay tuned as we roll out more research and tutorials.','Announcements','Namaa Team',NULL,true,'2 min');

INSERT INTO public.tutorial_videos (slug, title, description, video_url, category, level, duration, instructor, featured) VALUES
  ('intro-to-forex','Introduction to Forex Trading','A beginner-friendly walkthrough of what forex is, how currency pairs work, and how to get started safely.','https://www.youtube.com/embed/dQw4w9WgXcQ','Basics','Beginner','12 min','Namaa Academy',true);
