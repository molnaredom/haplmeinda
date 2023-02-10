import datetime
import os
import sqlite3

def beolvasas_tsv_beata():
    adatok = []

    with open("haplmelinda_oldal/kepek_adatai.csv") as f:
        f.readline()
        for i in f:
            a = i.strip().split(",")
            adatok.append(a)

    return adatok


def main():
    conn = sqlite3.connect("db.sqlite3")
    c = conn.cursor()
    eltolas = 1

    alapadatok_from_csv_sheets = beolvasas_tsv_beata()  # Munkaformmal kitöltött adatok

    alapadatok = alapadatok_from_csv_sheets
    print(alapadatok)

    records = []
    for i, adat in enumerate(alapadatok, eltolas):
        if not adat[0].startswith("#"):
            print((i, adat[0], adat[1], adat[2], adat[3], adat[4], adat[5],
                        adat[6], adat[7], adat[8], f"upload/{adat[0]}.jpg"))
            records.append((i, adat[0], adat[1], adat[2], adat[3], adat[4], adat[5],
                        adat[6], adat[7], adat[8], f"upload/{adat[0]}.jpg"))

    # insert multiple records in a single query
    c.executemany('INSERT INTO haplmelinda_oldal_kep VALUES(?,?,?,?,?,?,?,?,?,?,?);', records)

    print('Rögzítésre került', c.rowcount, 'sor')

    conn.commit()  # commit the changes to db
    conn.close()  # close the connection


main()
