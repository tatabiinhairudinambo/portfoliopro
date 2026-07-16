-- Create Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  gradient TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Albums Table
CREATE TABLE albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  class_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Media Table for nested Album media
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'image' or 'video'
  url TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS) but allow anonymous reads for public access
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on albums" ON albums FOR SELECT USING (true);
CREATE POLICY "Allow public read access on media" ON media FOR SELECT USING (true);

-- Insert dummy data for projects
INSERT INTO projects (title, description, full_desc, tags, category, image, gradient, live_url, github_url) VALUES
('Topos Digital', 'Lihat Langsung Bagaimana<br />Topos Bekerja', 'Jangan Biarkan Bisnis Anda Tertinggal! Mulai kelola bisnis Anda dengan lebih profesional dari kasir digital hingga manajemen gudang dalam satu aplikasi.', ARRAY['Design System', 'Figma', 'React', 'Storybook'], 'Branding', 'http://unggah.web.id/_eIAoKfJRjYR.png', 'from-transparent to-transparent', 'https://toposdigital.com/', '#'),
('Vertex', 'E-commerce platform redesign that drove a 34% increase in conversion.', 'A complete UX overhaul of an e-commerce platform serving 200K+ monthly visitors.', ARRAY['UX Research', 'Prototyping', 'Next.js', 'Tailwind'], 'Web', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'from-blue-500/20 to-purple-500/20', '#', '#'),
('Flux', 'Real-time data dashboard for a logistics company.', 'Built a high-performance dashboard handling millions of data points with WebSocket integration.', ARRAY['Dashboard', 'Data Viz', 'D3.js', 'React'], 'Data', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'from-orange-500/20 to-red-500/20', '#', '#');

-- Insert dummy data for albums
INSERT INTO albums (id, title, type, thumbnail, class_name) VALUES
('11111111-1111-1111-1111-111111111111', 'view story', 'video', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', 'md:col-span-2 md:row-span-2'),
('22222222-2222-2222-2222-222222222222', 'Live Streaming', 'image', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80', 'md:col-span-1 md:row-span-1'),
('33333333-3333-3333-3333-333333333333', 'Ruang Kerja & Suasana', 'image', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80', 'md:col-span-1 md:row-span-1'),
('44444444-4444-4444-4444-444444444444', 'vibe coding', 'image', 'https://unggah.web.id/PlEP7ywUSqNB.jpeg', 'md:col-span-2 md:row-span-1');

-- Insert dummy data for media
INSERT INTO media (album_id, type, url, caption) VALUES
('11111111-1111-1111-1111-111111111111', 'video', 'http://unggah.web.id/rFl_hsMZp5dm.mp4', 'saat meeting hydra core digitech'),
('11111111-1111-1111-1111-111111111111', 'image', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', 'Team Discussion'),
('22222222-2222-2222-2222-222222222222', 'image', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80', 'Strategy Session'),
('22222222-2222-2222-2222-222222222222', 'image', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80', 'Whiteboarding'),
('33333333-3333-3333-3333-333333333333', 'image', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80', 'Workspace Setup'),
('33333333-3333-3333-3333-333333333333', 'image', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80', 'Coffee Break'),
('33333333-3333-3333-3333-333333333333', 'image', 'https://unggah.web.id/PlEP7ywUSqNB.jpeg', 'Vibe Coding'),
('44444444-4444-4444-4444-444444444444', 'image', 'https://unggah.web.id/PlEP7ywUSqNB.jpeg', 'Late Night Coding'),
('44444444-4444-4444-4444-444444444444', 'image', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80', 'Setup');
