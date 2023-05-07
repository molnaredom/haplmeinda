SELECT k.* FROM haplmelinda_oldal_kep k
INNER JOIN haplmelinda_oldal_tema t ON k.tema_id = t.id
WHERE k.ar = 30000 AND t.nev LIKE '%természet%';
