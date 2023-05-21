CREATE OR REPLACE VIEW Albumes_Plus AS 
SELECT a.NomBan, a.NomAlb, a.Descrip, a.Imagen, a.TipoAlb, a.EnLista, a.Anio, a.Mes, a.Dia, a.NumEscuchasMax, a.LinkSpotify, a.LinkAmazon, a.Duracion, a.Visitas,
  (SELECT distinct MAX(estrellas) from generos_albumes where nomban = a.nomban and nomalb = a.nomalb) as EstrellasMax, 
  a.NumEscuchasMax+a.NumEscuchasMax*(SELECT distinct MAX(estrellas) FROM generos_albumes where nomban = a.nomban and nomalb = a.nomalb) as Puntuacion,
  (SELECT COUNT(email) FROM albumes al LEFT OUTER JOIN albumes_favoritos bl ON al.nomban = bl.nomban AND al.nomalb = bl.nomalb WHERE al.nomban LIKE a.nomban AND al.nomalb LIKE a.nomalb GROUP BY a.nomban, a.nomalb) as CountLikes,
  (SELECT COUNT(nomcan) FROM albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nomban LIKE a.nomban AND a2.nomalb LIKE a.nomalb GROUP BY a2.nomban, a2.nomalb) as CountCan,
  (SELECT COUNT(nomest) FROM albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nomban LIKE a.nomban AND a2.nomalb LIKE a.nomalb GROUP BY a2.nomban, a2.nomalb) as CountEst,
  (SELECT COUNT(nomgen) FROM albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nomban LIKE a.nomban AND a2.nomalb LIKE a.nomalb GROUP BY a2.nomban, a2.nomalb) as CountGen,
  (SELECT COUNT(nommus) FROM albumes a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nomban LIKE a.nomban AND a2.nomalb LIKE a.nomalb GROUP BY a2.nomban, a2.nomalb) as CountMus
FROM albumes a 
WHERE tipoAlb is not null 
ORDER BY puntuacion desc;

CREATE OR REPLACE VIEW Bandas_Plus AS 
SELECT b.NomBan, b.Pais, b.Origen, b.NumEscuchasMes, b.Imagen, b.Estatus, b.Descrip, b.LinkWeb, b.LinkSpotify, b.FechaIncorp, b.Visitas,
  (SELECT DISTINCT MAX(estrellas) from generos_bandas where nomban = b.nomban) as EstrellasMax, 
  b.NumEscuchasMes+b.NumEscuchasMes*(SELECT DISTINCT MAX(estrellas) FROM generos_bandas where nomban = b.nomban) as Puntuacion,
  (SELECT COUNT(nomalb) FROM bandas a2 LEFT OUTER JOIN albumes b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountAlb,
  (SELECT COUNT(email) FROM bandas a2 LEFT OUTER JOIN bandas_favoritas b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountLikes,
  (SELECT COUNT(nomcan) FROM bandas a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountCan,
  (SELECT COUNT(nomdisc) FROM bandas a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountDisc,
  (SELECT COUNT(nomest) FROM bandas a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountEst,
  (SELECT COUNT(nomgen) FROM bandas a2 LEFT OUTER JOIN generos_bandas b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountGen, 
  (SELECT COUNT(nommus) FROM bandas a2 LEFT OUTER JOIN musicos_bandas b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountMus,
  (SELECT COUNT(tema) FROM bandas a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.nomban = b2.nomban WHERE a2.nomban LIKE b.nomban GROUP BY a2.nomban) as CountTemas
FROM bandas b 
WHERE pais is not null 
ORDER BY Puntuacion desc;

CREATE OR REPLACE VIEW Discograficas_Plus AS 
SELECT d.NomDisc, d.Imagen, d.Pais, d.Direccion, d.Estatus, d.LinkWeb, d.Visitas,
  (SELECT SUM(puntuacion) FROM discograficas_albumes a2 LEFT OUTER JOIN albumes_plus b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as Puntuacion,
  (SELECT COUNT(DISTINCT b2.nomalb) FROM discograficas a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.nomdisc = b2.nomdisc WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountAlb,
  (SELECT COUNT(DISTINCT a2.nomban) FROM discograficas_albumes a2 WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountBan,
  (SELECT COUNT(DISTINCT b2.nomcan) FROM discograficas_albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountCan,
  (SELECT COUNT(DISTINCT b2.nomest) FROM discograficas_albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountEst,
  (SELECT COUNT(DISTINCT b2.nomgen) FROM discograficas_albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountGen, 
  (SELECT COUNT(DISTINCT b2.nommus) FROM discograficas_albumes a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountMus,
  (SELECT COUNT(DISTINCT b2.tema) FROM discograficas_albumes a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.nomban=b2.nomban WHERE a2.nomdisc LIKE d.nomdisc GROUP BY a2.nomdisc) as CountTemas
FROM discograficas d 
ORDER BY Puntuacion desc;

SELECT m.nommus, m.sexo, m.pais, m.origen, m.aniodef, m.mesdef, m.diadef, m.dianac, m.mesnac, m.anionac, m.imagen, m.visitas,
(SELECT SUM(puntuacion) FROM roles_musicos_albumes a2 LEFT OUTER JOIN albumes_plus b2 ON a2.nomban = b2.nomban AND a2.nomalb = b2.nomalb WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as Puntuacion,
(SELECT COUNT(DISTINCT b2.nomalb) FROM musicos a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.nommus = b2.nommus WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountAlb,
(SELECT COUNT(DISTINCT b2.nomban) FROM musicos a2 LEFT OUTER JOIN musicos_bandas b2 ON a2.nommus = b2.nommus WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountBan,
(SELECT COUNT(DISTINCT b2.rol) FROM musicos a2 LEFT OUTER JOIN roles_musicos_albumes b2 ON a2.nommus = b2.nommus WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountRoles,
(SELECT COUNT(DISTINCT b2.nomcan) FROM roles_musicos_albumes a2 LEFT OUTER JOIN canciones_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountCan,
(SELECT COUNT(DISTINCT b2.nomdisc) FROM roles_musicos_albumes a2 LEFT OUTER JOIN discograficas_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountDisc,
(SELECT COUNT(DISTINCT b2.nomest) FROM roles_musicos_albumes a2 LEFT OUTER JOIN estudios_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountEst,
(SELECT COUNT(DISTINCT b2.nomgen) FROM roles_musicos_albumes a2 LEFT OUTER JOIN generos_albumes b2 ON a2.nomban=b2.nomban AND a2.nomalb=b2.nomalb WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountGen,
(SELECT COUNT(DISTINCT b2.tema) FROM musicos_bandas a2 LEFT OUTER JOIN temas_letra_bandas b2 ON a2.nomban=b2.nomban WHERE a2.nommus LIKE m.nommus GROUP BY a2.nommus) as CountTemas
FROM musicos m 
ORDER BY Puntuacion desc;