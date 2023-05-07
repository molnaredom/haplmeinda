SET SERVEROUTPUT ON
DECLARE
    CURSOR kep_ar_noveles IS
        SELECT technika_id, ar
        FROM haplmelinda_oldal_kep
        FOR UPDATE OF ar NOWAIT;
    uj_ar haplmelinda_oldal_kep.ar%TYPE;
    tmp_technika  haplmelinda_oldal_kep.technika_id%TYPE;
BEGIN --10
    FOR kep IN kep_ar_noveles
    LOOP
        DBMS_OUTPUT.PUT_LINE('Az új ára a' || 'képnek = ' || kep.technika_id);
    END LOOP;

    OPEN kep_ar_noveles;
    LOOP --17

        FETCH kep_ar_noveles INTO tmp_technika, uj_ar;
        uj_ar := 10000;
        IF tmp_technika = 1 THEN
            uj_ar := 30000;
        elsIF tmp_technika = 2 THEN
            uj_ar := 70000;
        elsIF tmp_technika = 3 THEN
            uj_ar := 40000;
        ELSE
            uj_ar := 25000;
        END IF;
        EXIT WHEN kep_ar_noveles%NOTFOUND;

        UPDATE haplmelinda_oldal_kep
        SET ar = uj_ar
        WHERE CURRENT OF kep_ar_noveles;
    END LOOP;

    CLOSE kep_ar_noveles;

    FOR kep IN kep_ar_noveles
    LOOP
        DBMS_OUTPUT.PUT_LINE('Az új ára a' || 'képnek = ' || kep.ar);
    END LOOP;
END;
