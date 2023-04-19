CREATE OR REPLACE VIEW Puntuacion_Albumes AS 
SELECT a.NomBan, a.NomAlb, a.NumEscuchasMax, 
  (SELECT distinct MAX(estrellas) from generos_albumes where nomban = a.nomban and nomalb = a.nomalb) as estrellas, 
  a.NumEscuchasMax+a.NumEscuchasMax*(SELECT distinct MAX(estrellas) FROM generos_albumes where nomban = a.nomban and nomalb = a.nomalb) as puntuacion 
FROM albumes a 
WHERE tipoAlb is not null 
ORDER BY puntuacion desc;

CREATE OR REPLACE VIEW Puntuacion_Bandas AS 
SELECT b.NomBan, b.NumEscuchasMes, 
  (SELECT DISTINCT MAX(estrellas) from generos_bandas where nomban = b.nomban) as estrellas, 
  b.NumEscuchasMes+b.NumEscuchasMes*(SELECT DISTINCT MAX(estrellas) FROM generos_bandas where nomban = b.nomban) as puntuacion 
FROM bandas b 
WHERE pais is not null 
ORDER BY puntuacion desc;