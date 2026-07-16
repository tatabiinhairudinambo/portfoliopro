-- 1. Create Site Content Table
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- e.g., 'hero', 'about'
  key TEXT NOT NULL UNIQUE, -- e.g., 'hero_title', 'hero_subtitle'
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert Default Data for Hero Section
INSERT INTO site_content (section, key, value) VALUES
('hero', 'hero_name', 'Tatabiin Hairudin Ambo'),
('hero', 'hero_title_1', 'PORT'),
('hero', 'hero_title_2', 'FOLIO'),
('hero', 'hero_subtitle_1', 'Freelance Full'),
('hero', 'hero_subtitle_2', 'Stack Developer.'),
('hero', 'hero_running_text', 'Saya membantu bisnis, UMKM, startup, dan mahasiswa membangun website, aplikasi web, sistem informasi, dashboard admin, integrasi API, Google Apps Script, hingga software kustom yang modern, aman, dan mudah dikembangkan.'),
('hero', 'hero_profile_img', '/profile.jpg'),
('hero', 'hero_back_img', '/belakang.jpg?v=2')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 3. RLS Policies
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can read content
CREATE POLICY "Public can read site_content" ON site_content FOR SELECT USING (true);

-- Admin can update content
CREATE POLICY "Admin can insert site_content" ON site_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update site_content" ON site_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete site_content" ON site_content FOR DELETE TO authenticated USING (true);
