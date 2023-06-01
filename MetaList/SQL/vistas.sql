CREATE OR REPLACE VIEW albumes_plus AS 
SELECT a.NomBan, a.NomAlb, a.Descrip, a.Imagen, a.TipoAlb, a.EnLista, a.Anio, a.Mes, a.Dia, a.NumEscuchasMax, a.LinkSpotify, a.LinkAmazon, a.Duracion, a.Visitas,
  (SELECT distinct MAX(Estrellas) from generos_albumes where NomBan = a.NomBan and NomAlb = a.NomAlb) as EstrellasMax, 
  a.NumEscuchasMax+a.NumEscuchasMax*(SELECT distinct MAX(Estrellas) FROM generos_albumes where NomBan = a.NomBan and NomAlb = a.NomAlb) as Puntuacion,
  (SELECT COUNT(Email) FROM albumes al LEFT OUTER JOIN albumes_favoritos bl ON al.NomBan = bl.NomBan AND al.NomAlb = bl.NomAlb WHERE al.NomBan LIKE a.NomBan AND al.NomAlb LIKE a.NomAlb GROUP BY a.NomBan, a.NomAlb) as CountLikes,
  (SELECT COUNT(NomCan) FROM albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomBan LIKE a.NomBan AND a2.NomAlb LIKE a.NomAlb GROUP BY a2.NomBan, a2.NomAlb) as CountCan,
  (SELECT COUNT(NomEst) FROM albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomBan LIKE a.NomBan AND a2.NomAlb LIKE a.NomAlb GROUP BY a2.NomBan, a2.NomAlb) as CountEst,
  (SELECT COUNT(NomGen) FROM albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomBan LIKE a.NomBan AND a2.NomAlb LIKE a.NomAlb GROUP BY a2.NomBan, a2.NomAlb) as CountGen,
  (SELECT COUNT(NomMus) FROM albumes a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomBan LIKE a.NomBan AND a2.NomAlb LIKE a.NomAlb GROUP BY a2.NomBan, a2.NomAlb) as CountMus
FROM albumes a 
WHERE TipoAlb IS NOT NULL 
ORDER BY Puntuacion DESC;

CREATE OR REPLACE VIEW bandas_plus AS 
SELECT b.NomBan, b.Pais, b.Origen, b.NumEscuchasMes, b.Imagen, b.Estatus, b.Descrip, b.LinkWeb, b.LinkSpotify, b.FechaIncorp, b.Visitas,
  (SELECT DISTINCT MAX(Estrellas) from generos_bandas where NomBan = b.NomBan) as EstrellasMax, 
  b.NumEscuchasMes+b.NumEscuchasMes*(SELECT DISTINCT MAX(Estrellas) FROM generos_bandas where NomBan = b.NomBan) as Puntuacion,
  (SELECT COUNT(NomAlb) FROM bandas a2 LEFT OUTER JOIN albumes b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountAlb,
  (SELECT COUNT(Email) FROM bandas a2 LEFT OUTER JOIN bandas_favoritas b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountLikes,
  (SELECT COUNT(NomCan) FROM bandas a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountCan,
  (SELECT COUNT(NomDisc) FROM bandas a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountDisc,
  (SELECT COUNT(NomEst) FROM bandas a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountEst,
  (SELECT COUNT(NomGen) FROM bandas a2 LEFT OUTER JOIN generos_bandas b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountGen, 
  (SELECT COUNT(NomMus) FROM bandas a2 LEFT OUTER JOIN musicos_bandas b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountMus,
  (SELECT COUNT(Tema) FROM bandas a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.NomBan = b2.NomBan WHERE a2.NomBan LIKE b.NomBan GROUP BY a2.NomBan) as CountTemas
FROM bandas b 
WHERE Pais IS NOT NULL 
ORDER BY Puntuacion DESC;

CREATE OR REPLACE VIEW discograficas_plus AS 
SELECT d.NomDisc, d.Imagen, d.Pais, d.Direccion, d.Estatus, d.LinkWeb, d.Visitas,
  (SELECT SUM(Puntuacion) FROM discograficas_albumes a2 LEFT OUTER JOIN albumes_plus b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as Puntuacion,
  (SELECT COUNT(DISTINCT b2.NomAlb) FROM discograficas a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.NomDisc = b2.NomDisc WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountAlb,
  (SELECT COUNT(DISTINCT a2.NomBan) FROM discograficas_albumes a2 WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountBan,
  (SELECT COUNT(DISTINCT b2.NomCan) FROM discograficas_albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountCan,
  (SELECT COUNT(DISTINCT b2.NomEst) FROM discograficas_albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountEst,
  (SELECT COUNT(DISTINCT b2.NomGen) FROM discograficas_albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountGen, 
  (SELECT COUNT(DISTINCT b2.NomMus) FROM discograficas_albumes a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountMus,
  (SELECT COUNT(DISTINCT b2.Tema) FROM discograficas_albumes a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.NomBan=b2.NomBan WHERE a2.NomDisc LIKE d.NomDisc GROUP BY a2.NomDisc) as CountTemas
FROM discograficas d 
ORDER BY Puntuacion DESC;

CREATE OR REPLACE VIEW musicos_plus AS 
SELECT m.NomMus, m.Sexo, m.Pais, m.Origen, m.AnioDef, m.MesDef, m.DiaDef, m.DiaNac, m.MesNac, m.AnioNac, m.Imagen, m.Visitas,
(SELECT SUM(Puntuacion) FROM roles_musicos_albumes a2 LEFT OUTER JOIN albumes_plus b2 ON a2.NomBan = b2.NomBan AND a2.NomAlb = b2.NomAlb WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as Puntuacion,
(SELECT COUNT(DISTINCT b2.NomAlb) FROM musicos a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.NomMus = b2.NomMus WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountAlb,
(SELECT COUNT(DISTINCT b2.NomBan) FROM musicos a2 LEFT OUTER JOIN musicos_bandas b2 ON a2.NomMus = b2.NomMus WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountBan,
(SELECT COUNT(DISTINCT b2.Rol) FROM musicos a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.NomMus = b2.NomMus WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountRoles,
(SELECT COUNT(DISTINCT b2.NomCan) FROM roles_musicos_albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountCan,
(SELECT COUNT(DISTINCT b2.NomDisc) FROM roles_musicos_albumes a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountDisc,
(SELECT COUNT(DISTINCT b2.NomEst) FROM roles_musicos_albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountEst,
(SELECT COUNT(DISTINCT b2.NomGen) FROM roles_musicos_albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.NomBan=b2.NomBan AND a2.NomAlb=b2.NomAlb WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountGen,
(SELECT COUNT(DISTINCT b2.Tema) FROM musicos_bandas a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.NomBan=b2.NomBan WHERE a2.NomMus LIKE m.NomMus GROUP BY a2.NomMus) as CountTemas
FROM musicos m 
ORDER BY Puntuacion DESC;