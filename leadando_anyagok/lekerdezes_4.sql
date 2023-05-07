SELECT p.szallitasi_hely, p.telefon, p.teljes_nev
FROM haplmelinda_oldal_rendeles r
INNER JOIN haplmelinda_oldal_kosar k ON k.id = r.kosar_id
INNER JOIN haplmelinda_oldal_profile p ON p.id = k.profile_id
ORDER BY r.total_price DESC;
