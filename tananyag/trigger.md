![img.png](img.png)
- OR REPLACE: meglévő trigger felülírása
- BEFORE AFTER - fizikai tabla, INSTEAD OF - nezettabla
- 1 táblát lehet megadni egy triggerhez
- REFERENCING: milyen néven hivatkozzuk a régi és új értékeket
- INSERT: NEW, UPDATE: OLD és NEW, DELETE: OLD
- FOR EACH ROW: minden érintett sor esetén hajtódjon végre
     - alapból sor szintű ,elenkező esetben utasitas szintu trigger


![img_1.png](img_1.png)
Ha letiltom, nem törlődik, de nem is aktiválódik
# RENDSZERTRIGGER
![img_6.png](img_6.png)

![img_7.png](img_7.png)
Bejelentkezésnél mindig after , kijelentkezesnel mindig before triggert kell hasznalni, (mert ugy erjuk el a tablat)

