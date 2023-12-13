# OCR szakdolgozati program

Ez a program annak érdekében készült, hogy az OCR programok által készített eredményeket feljavítsa

## Előkészületek

1. Le kell tölteni a node.js 18.13.0 vagy annál frissebb verzióját a gépünkre.
2. Kell a gépünkre egy PostgreSQL adatbáziskezelőt (https://www.postgresql.org)
3. Az adatbázis kezelőben létre kell hozni egy 'ocrscanner' nevű adatbázist (hasonló módon, mint a videóban: https://youtu.be/9SGDpanrc8U?si=hlPpEdCK2hx9EXCm&t=1969)
4. username='postgres' jelszó='admin' legyen majd, mert akkor jön létre a kapcsolat az adatbázissal
5. A program indítása előtt kell majd egy Gradle buildet indítani a backend oldalon
6. A terminálban le kell tölteni a legfrissebb npm-t az 'npm i' paranccsal

## Backend indítás

Ha megvan az előkészületekkel, akkor a backend -> src -> main -> java -> BackendApplication.java osztályt kell elindítani.
Meg kell várni, amíg a Spring felépül és aztán elérhető lesz az adatbázis is.
Minden indításnál az adatbázis üresen indul el, mert még a program fejlesztés alatt van.
Az application.properties fájlban ez módosítható természetesen, ha a spring.jpa.hibernate.ddl-auto értékét módosítjuk.
(Segítő link a property módosításhoz: https://stackoverflow.com/questions/42135114/how-does-spring-jpa-hibernate-ddl-auto-property-exactly-work-in-spring)

## Frontend indítás

A terminált meg kell nyitni a fejlesztő környezetben és el kell menni a frontend-react mappába a 'cd frontend-react' paranccsal.
Ezután csak egy 'npm start' parancsot kell kiadni és ha elkészült a buildel, akkor a böngészőkben megnyílik a kívánt oldal.
