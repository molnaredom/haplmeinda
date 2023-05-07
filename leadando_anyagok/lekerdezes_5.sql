SELECT cim, ar FROM haplmelinda_oldal_kep k
INNER JOIN haplmelinda_oldal_technika tech ON k.technika_id = tech.id
INNER JOIN haplmelinda_oldal_tema tema ON k.tema_id = tema.id
WHERE tech.nev = 'vászon' OR tema.nev LIKE '%szerelem%';
