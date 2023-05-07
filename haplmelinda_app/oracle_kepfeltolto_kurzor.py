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
    for i in [(1, 'fa'), (2, 'tűzzománc'), (3, 'üveg'), (4, 'Egyéb')]:
        if kep[6] == i[1]:
            return i[0]
    return 4


def tema(kep):
    for i in [(1, 'női alak'), (2, 'női arc'), (3, 'természet'), (4, 'vallási téma'), (5, 'szerelem'), (6, 'virág'),
     (7, 'mese figura'), (8, 'állat'), (9, 'mandala'), (10, 'Egyéb')]:
        if kep[5] == i[1]:
            return i[0]
    return 10

def eladva(kep):
    return 0 if kep[8] == 'false' else 1

# temak = ["női alak","női arc","természet", "vallási téma", "szerelem", "virág", "mese figura", "állat", "mandala", "Egyéb"]
# k = []
# for i,temanev in enumerate(temak, 1):
#     k.append((i,temanev))
#     parancs = f"""
#             INSERT INTO haplmelinda_oldal_tema VALUES({i}, '{temanev}')
#             """
#     print(parancs)
#     cursor.execute(parancs)
# print(k)
# #
# technikak = ["fa","tűzzománc","üveg", "Egyéb"]
# k = []
# for i,technika in enumerate(technikak, 1):
#     k.append((i,technika))
#     parancs = f"""
#             INSERT INTO haplmelinda_oldal_technika VALUES({i},'{technika}')
#             """
#     cursor.execute(parancs)
# print(k)

for i,kep in enumerate(kep_csv_adatok, 1):
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





