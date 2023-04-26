Dekralációs(elhagyható) és vezérlő szegmens(kötelező)
SET SERVEROUTPUT ON -- kiiratas engedelyezese
DBMS_OUTPUT.PUTLINE("printkent kiiratas");

Dekralációs szegmens
DECLARE- től a BEGIN- ig tart
- Lehet benne Plsql (skalar adat, összetett adat, pointer, LOB)
- Lehet benne NemPLsql (SQL*plus, forms képernyőmező )
CONSTANT, NOT NULL, DEFAULT = ":="
ÖSSZEFŰZÉS = "||"
input felvétele(DECLARE előtt kell meghivni): ACCEPT valtozo PROMPT 'add meg az erteket';
v_valtozo := '&valtozo'
Konvenciók: v_* valtozo, c_* konstans, h_* sql*plus, p_* parameter
Custom Rekordtipus --> TYPE rekordtupusnev IS RECORD (mezonev tipus, ..., mezonev CHAR(20pl.);
SQLben nem lehet valtozokban tarolni, PLslqben igen ->> Select x1.. INTO v1.., FROM tabla

Típus hivatkozások, változó vagy konstans dekralációkor --> 1. tabla.mezo%TYPE vagy 2. tabla%RAWTYPE
Pl.: v_x szemely.id%TYPE --> itt pl NUMBER ként jelenik meg a type, nem kell beirni kezzel
PL2.: v_2x szemely%ROWTYPE --> select * al ki tudjuk kérni a változóból a sorokat minthat [] lenne

Sorazonosító - ROWID
- meglevo rekord sorazonositojat lehet lekerni, attributumot meg lehet valtoztatni ROWID segitsegevel

# Vezérlési szerkezetek:
- IF feltetel THEN ||||| ELISIF, |||||| ELSE |||||| END IF; külön sor minden
- Aktuális rendszerdátum SYSDATE ||||| Időpont egy részének kinyerése: EXTRACT (HOUR FROM vege)
  - napok száma min str = TO_CHAR(SYSDATE, 'D') # a het elso napja vasarnap
- Esetkiválasztás: CASE valtozo \n WHEN feltetel THEN utasitas;\n... ... END CASE;
- Végtelen ciklus: LOOP utasitasok END LOOP; |||| kilépés a ciklusból: EXIT; ||| ue. feltétellel EXIT WHEN feltétel;
- For: FOR ciklusvalt IN alsohatar .. felsohatar LOOP utaitasok END LOOP;
  - alohatar mindig kisebb felsonel, visszafele= REVERSE alsohatar elé, IN után
- Eloltesztelős: WHILE feltétel LOOP utasitasok END LOOP;

# Kurzorok
- def: mutatók feldolgozás alatt lévő(CRUD) adathatlmaz rekordjára mutat
    - IMplicit: CUD és nem explicit Read esetén létrejön, nem lehet névvel hivatkozni rá(nincs alias) -> Max 1 rekordot ad vissza(vagy 0)
    - EXplicit: Dekraléciós szegmensben dekralálni kell, névvel rendelkezik --> Rekordok külön-külön kezelésére
- DECLARE \n\t CURSOR kurzornev IS alkerdes;\n rekord rekordtipus
- BEGIN \n\t OPEN kurzornev; 
