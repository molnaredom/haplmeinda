create or replace NONEDITIONABLE TRIGGER uj_kosar_TR
AFTER INSERT ON haplmelinda_oldal_profile
FOR EACH ROW
BEGIN
INSERT INTO haplmelinda_oldal_kosar VALUES (:NEW.id, :NEW.id);
END;
