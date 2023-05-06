SET SERVEROUTPUT ON
DECLARE
    CURSOR kep_ar_noveles IS
        SELECT ar
        FROM haplmelinda_oldal_kep
        FOR UPDATE OF ar NOWAIT;
    tmp_ar haplmelinda_oldal_kep.ar%TYPE;
BEGIN

    OPEN kep_ar_noveles;
    LOOP
        FETCH kep_ar_noveles INTO tmp_ar;
        EXIT WHEN kep_ar_noveles%NOTFOUND;

        UPDATE haplmelinda_oldal_kep
        SET ar = tmp_ar * 1.03
        WHERE CURRENT OF kep_ar_noveles;
    END LOOP;

    CLOSE kep_ar_noveles;

    FOR kep IN kep_ar_noveles
    LOOP
        DBMS_OUTPUT.PUT_LINE('Az új ára a' || 'képnek = ' || kep.ar);
    END LOOP;
END;
