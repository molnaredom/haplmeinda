import os.path
import time

import cx_Oracle
def beolvasas_tsv():
    adatok = []
    with open("haplmelinda_app/kepek_adatai.csv") as f:
        f.readline()
        for i in f:
            a = i.strip().split(",")
            adatok.append(a)
    return adatok


connection = cx_Oracle.connect(user="system", password="oracle",dsn="localhost/xe")
cursor = connection.cursor()
kep_csv_adatok = beolvasas_tsv()
print(kep_csv_adatok)

cursor.execute(f"""select * from haplmelinda_oldal_kep""")
print("*"*200)
for a in cursor:
    print("Values:", a)
def technika(kep):
    return 1
def tema(kep):
    return 1

def eladva(kep):
    return 0 if kep[8] == 'false' else 1

for i,kep in enumerate(kep_csv_adatok, 2):
    if os.path.exists(f'haplmelinda_app/upload/{kep[0]}.jpg'):
        print(f"[{kep[0]}] Jó :)")
        parancs = f"""
                INSERT INTO haplmelinda_oldal_kep VALUES({i},{kep[0]},'{kep[1]}','{kep[2]}','{kep[3]}',{kep[4]},
                'leiras', {eladva(kep)}, 'upload/{kep[0]}.jpg', {technika(kep)}, {tema(kep)})
                """
        # print(parancs)
        cursor.execute(parancs)
        # time.sleep(0.5)
    else:
        print(f"[{kep[0]}]Nem létezik sorszam: ")

connection.commit()  # commit the changes to db
connection.close()





