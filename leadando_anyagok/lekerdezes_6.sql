SELECT p.teljes_nev, SUM(r.total_price) AS osszesen_koltott
FROM haplmelinda_oldal_rendeles r
INNER JOIN haplmelinda_oldal_kosar k ON k.id = r.kosar_id
INNER JOIN haplmelinda_oldal_profile p ON p.id = k.profile_id
GROUP BY p.id, p.teljes_nev
ORDER BY osszesen_koltott DESC;
