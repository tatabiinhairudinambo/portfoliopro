-- Hapus policy lama (opsional, untuk membersihkan)
-- DROP POLICY IF EXISTS "Allow public read access on projects" ON projects;
-- DROP POLICY IF EXISTS "Allow public read access on albums" ON albums;
-- DROP POLICY IF EXISTS "Allow public read access on media" ON media;

-- Pastikan RLS menyala
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- 1. Policy untuk SEMUA ORANG (bisa membaca data)
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read albums" ON albums FOR SELECT USING (true);
CREATE POLICY "Public can read media" ON media FOR SELECT USING (true);

-- 2. Policy untuk ADMIN (bisa menambah, mengedit, menghapus data)
-- 'authenticated' berarti user yang sudah login.
CREATE POLICY "Admin can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin can insert albums" ON albums FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update albums" ON albums FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete albums" ON albums FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin can insert media" ON media FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update media" ON media FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin can delete media" ON media FOR DELETE TO authenticated USING (true);

-- 3. Membuat Bucket Storage untuk menyimpan gambar dan video
-- (Jalankan ini jika Anda belum membuat bucket 'portfolio-media')
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy untuk mengizinkan semua orang melihat file (gambar/video)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'portfolio-media' );

-- Policy untuk mengizinkan admin mengupload/mengedit file
CREATE POLICY "Admin Upload Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'portfolio-media' );
CREATE POLICY "Admin Update Access" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'portfolio-media' );
CREATE POLICY "Admin Delete Access" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'portfolio-media' );
