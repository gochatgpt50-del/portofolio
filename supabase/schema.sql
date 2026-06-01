-- ============================================================
-- Portfolio Lenny Sundari Arnas — Supabase Database Schema
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================================

-- 1. Pesan dari form Contact
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Pengalaman Kerja
CREATE TABLE IF NOT EXISTS work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  technologies TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Pendidikan
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  start_year INT,
  end_year INT,
  gpa TEXT,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT DEFAULT 80,
  order_index INT DEFAULT 0
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert messages" ON messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read work_experience" ON work_experience
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public read education" ON education
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public read skills" ON skills
  FOR SELECT TO anon USING (true);

-- ============================================================
-- Data Lenny Sundari Arnas
-- ============================================================

-- Pengalaman Kerja
INSERT INTO work_experience (company, position, location, start_date, end_date, is_current, description, technologies, order_index) VALUES
  (
    'Paragon Technology and Innovation',
    'Beauty Advisor (Brand Ambassador)',
    'Palembang, Sumatera Selatan',
    '2022-01-01', '2024-12-31', FALSE,
    'Bertugas sebagai Brand Ambassador produk kecantikan Paragon (Wardah, Make Over, Emina, dll). Memberikan konsultasi kecantikan, demo makeup, dan edukasi produk skincare kepada pelanggan. Mencapai target penjualan secara konsisten dan membangun loyalitas pelanggan melalui pendekatan personal yang hangat.',
    ARRAY['Makeup Artistry', 'Skincare Consultation', 'Sales', 'Customer Service', 'Brand Communication'],
    1
  ),
  (
    'Klinik Kecantikan / Kesehatan',
    'Admin Klinik',
    'Palembang, Sumatera Selatan',
    '2020-01-01', '2022-01-01', FALSE,
    'Mengelola administrasi klinik termasuk penjadwalan pasien, pengelolaan rekam medis, dan koordinasi dengan tenaga medis. Memberikan pelayanan prima kepada pasien dan memastikan operasional klinik berjalan lancar.',
    ARRAY['Administrasi', 'Customer Service', 'Manajemen Data', 'Komunikasi', 'Koordinasi Tim'],
    2
  );

-- Pendidikan
INSERT INTO education (institution, degree, field, start_year, end_year, gpa, description, order_index) VALUES
  (
    'Universitas',
    'S1 Ilmu Komunikasi',
    'Komunikasi',
    2022, NULL, NULL,
    'Mendalami ilmu komunikasi massa, hubungan masyarakat, komunikasi interpersonal, dan media digital. Aktif dalam kegiatan kampus dan pengembangan soft skill komunikasi.',
    1
  ),
  (
    'Sekolah Menengah Atas',
    'SMA',
    'IPA/IPS',
    2017, 2020, NULL,
    NULL,
    2
  );

-- Skills Lenny
INSERT INTO skills (name, category, level, order_index) VALUES
  ('Beauty Consultation', 'Kecantikan', 95, 1),
  ('Makeup Application', 'Kecantikan', 92, 2),
  ('Skincare Knowledge', 'Kecantikan', 90, 3),
  ('Color Analysis', 'Kecantikan', 85, 4),
  ('Content Creation', 'Digital', 88, 5),
  ('Social Media Marketing', 'Digital', 85, 6),
  ('Fotografi Produk', 'Digital', 80, 7),
  ('Public Speaking', 'Komunikasi', 87, 8),
  ('Customer Relations', 'Komunikasi', 92, 9),
  ('Copywriting', 'Komunikasi', 80, 10),
  ('Manajemen UMKM', 'Bisnis', 85, 11),
  ('Brand Ambassador', 'Bisnis', 90, 12);
