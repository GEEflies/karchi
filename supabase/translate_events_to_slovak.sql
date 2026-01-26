-- Migration: Translate Event Types to Slovak

-- 1. Find user ID for 'karchigod'
DO $$
DECLARE
  karchi_id UUID;
BEGIN
  SELECT id INTO karchi_id FROM users WHERE username = 'karchigod' LIMIT 1;

  IF karchi_id IS NOT NULL THEN
      -- 2. Update existing event types
      UPDATE event_types
      SET 
          title = 'Úvodný hovor',
          description = 'Rýchly 30-minútový rozhovor o vašom projekte a o tom, či sme pre seba tí praví.'
      WHERE user_id = karchi_id AND slug = 'intro';

      UPDATE event_types
      SET 
          title = 'Konzultácia',
          description = 'Hĺbková analýza vašej technickej stratégie, architektúry alebo dizajnových potrieb.'
      WHERE user_id = karchi_id AND slug = 'consultation';

      UPDATE event_types
      SET 
          title = 'Štart projektu',
          description = 'Poďme spoločne rozbehnúť váš nový projekt.'
      WHERE user_id = karchi_id AND slug = 'kickoff';
      
  END IF;
END $$;
