CREATE OR REPLACE TRIGGER RENDELES_MEGSZUNES
AFTER DELETE ON haplmelinda_oldal_rendeles
FOR EACH ROW
BEGIN
DELETE FROM haplmelinda_oldal_kosar_kepek
where haplmelinda_oldal_kosar_kepek.kosar_id = :OLD.kosar_id;
END;
