-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability templates
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0=Nedeľa, 6=Sobota
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'UTC'
);

-- Event types (e.g., "30-min call", "1-hour consultation")
CREATE TABLE event_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  description TEXT,
  slug TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type_id UUID REFERENCES event_types(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  timezone TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'confirmed', -- confirmed, cancelled, rescheduled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_availability_user ON availability(user_id);
CREATE INDEX idx_event_types_user ON event_types(user_id);
CREATE INDEX idx_bookings_event_type ON bookings(event_type_id);
CREATE INDEX idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public READ access policies
CREATE POLICY "Public read access for users" ON users FOR SELECT USING (true);
CREATE POLICY "Public read access for availability" ON availability FOR SELECT USING (true);
CREATE POLICY "Public read access for event_types" ON event_types FOR SELECT USING (true);

-- Allow anyone to INSERT a booking (guests don't need to be logged in)
CREATE POLICY "Public insert access for bookings" ON bookings FOR INSERT WITH CHECK (true);

-- SEED DATA (Aby appka fungovala hneď pre 'karchigod')
INSERT INTO users (username, name, email, avatar_url)
VALUES ('karchigod', 'Karchi', 'contact@karchi.com', '/images/booking-profile.jpg');

-- Získame ID používateľa na vloženie súvisiacich dát
DO $$
DECLARE
  karchi_id UUID;
BEGIN
  SELECT id INTO karchi_id FROM users WHERE username = 'karchigod' LIMIT 1;

  -- Vloženie typov stretnutí
  INSERT INTO event_types (user_id, title, slug, duration_minutes, description)
  VALUES 
  (karchi_id, 'Úvodný hovor', 'intro', 30, 'Krátky 30-minútový rozhovor o Vašich nápadoch. Tu zistíme, či si sadneme.'),
  (karchi_id, 'Konzultácia', 'consultation', 60, 'Detailný rozbor Vašej stratégie alebo dizajnu.'),
  (karchi_id, 'Štart projektu', 'kickoff', 45, 'Rozbehnutie Vášho nového projektu.');

  -- Vloženie predvolenej dostupnosti (Po-Pia, 9:00-17:00)
  INSERT INTO availability (user_id, day_of_week, start_time, end_time, timezone)
  VALUES
  (karchi_id, 1, '09:00', '17:00', 'Europe/Bratislava'), -- Pondelok
  (karchi_id, 2, '09:00', '17:00', 'Europe/Bratislava'), -- Utorok
  (karchi_id, 3, '09:00', '17:00', 'Europe/Bratislava'), -- Streda
  (karchi_id, 4, '09:00', '17:00', 'Europe/Bratislava'), -- Štvrtok
  (karchi_id, 5, '09:00', '15:00', 'Europe/Bratislava'); -- Piatok (skorší koniec)
  
END $$;