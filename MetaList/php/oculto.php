<?
  $dbhost="localhost";
	$dbuser="root";
	$dbpass="admin";
	$dbname="MetaList";
	$apikey="TheBig4000MetaListMariusTNTX";
	$metaliststoragelocal="C:/Apache24/htdocs/MetaList/MetaListStorage/userProfilePictures/";
	$metaliststorageremote="http://localhost/MetaList/MetaListStorage/userProfilePictures/";

	$filtros=array(
		"albumes"=>array(
			"nombreAlbum" => ["albumes","varchar"],
			"banda" => ["albumes","varchar"],
			"tipo" => ["albumes","varchar"],
			"enLista" => ["albumes","varchar"],
			"anio" => ["albumes","int"],
			"anioMin" => "int",
			"anioMax" => "int",
			"mes" => "int",
			"dia" => "int",
			"escuchas" => "int",
			"escuchasMin" => "int",
			"escuchasMax" => "int",
			"duracion" => "int",
			"duracionMin" => "int",
			"duracionMax" => "int"
		),
		"bandas"=>array(
			"nombre" => "varchar",
			"pais" => "varchar",
			"origen" => "varchar",
			"escuchas" => "int",
			"escuchasMin" => "int",
			"escuchasMax" => "int",
			"estatus" => "varchar"
		)
	);

	$root=array(
		"albumes" => array(
			"info" => "SELECT nomalb as nombre, descrip, imagen, tipoalb as tipo, enlista, anio, mes, dia, numescuchasmax as escuchas, linkspotify, linkamazon, duracion FROM ALBUMES",
			"banda" => "Nomban LIKE '?'",
			"cancion" => "Nomalb IN (SELECT nomalb FROM CANCIONES_ALBUMES WHERE nomcan LIKE '?')",
			"discografica" => "Nomalb IN (SELECT nomalb FROM DISCOGRAFICAS_ALBUMES WHERE nomdisc LIKE '?')",
			"estudio" => "Nomalb IN (SELECT nomalb FROM ESTUDIOS_ALBUMES WHERE nomest LIKE '?')",
			"genero" => "Nomalb IN (SELECT nomalb FROM GENEROS_ALBUMES WHERE nomgen LIKE '?')",
			"estrellas-genero" => "Nomalb IN (SELECT nomalb FROM GENEROS_ALBUMES WHERE nomgen LIKE '?' AND estrellas = ?)",
			"musico" => "Nomalb IN (SELECT nomalb FROM ROLES_MUSICOS_ALBUMES WHERE nommus LIKE '?')",
			"rol-musico" => "Nomalb IN (SELECT nomalb FROM ROLES_MUSICOS_ALBUMES WHERE nommus LIKE '?' AND rol LIKE '?')"
		),
		"bandas" => array(
			"key" => "nomban",
			"select" => "SELECT nomban as nombre, pais, origen, numescuchasmes as escuchas, imagen, estatus, descrip, linkweb, linkspotify FROM BANDAS",
			"nombre" => "Nomban LIKE '?'",
			"pais" => "pais LIKE '?'",
			"origen" => "origen LIKE '?'",
			"escuchas" => "escuchas = ?",
			"estatus" => "estatus LIKE '?'",
			"album" => "Nomban IN (SELECT Nomban FROM ALBUMES WHERE NomAlb LIKE '?')",
			"cancion" => "Nomban IN (SELECT Nomban FROM CANCIONES_ALBUMES WHERE NomCan LIKE '?')",
			"discografica" => "Nomban IN (SELECT Nomban FROM DISCOGRAFICAS_ALBUMES WHERE NomDisc LIKE '?')",
			"estudio" => "Nomban IN (SELECT Nomban FROM ESTUDIOS_ALBUMES WHERE NomEst LIKE '?')",
			"anioInic" => "Nomban IN (SELECT Nomban FROM ETAPAS_BANDAS WHERE AnioInic = ?)",
			"anioFin" => "Nomban IN (SELECT Nomban FROM ETAPAS_BANDAS WHERE AnioFin = ?)",
			"genero" => "Nomban IN (SELECT Nomban FROM GENEROS_BANDAS WHERE NomGen LIKE '?')",
			"musico" => "Nomban IN (SELECT Nomban FROM MUSICOS_BANDAS WHERE NomMus LIKE '?')",
			"tema" => "Nomban IN (SELECT Nomban FROM TEMAS_LETRA_BANDAS WHERE tema LIKE '?')"
		),
		"discograficas" => array(
			"info" => "SELECT nomdisc as nombre, imagen, pais, direccion, estatus, linkweb FROM DISCOGRAFICAS WHERE NomDisc LIKE ?",
			"albumes" => "SELECT nomalb as nombre, nomban as banda FROM DISCOGRAFICAS_ALBUMES WHERE NomDisc LIKE ?",
			"bandas" => "",
			"canciones" => "",
			"estudios" => "",
			"generos" => "",
			"musicos" => "",
			"temas" => ""
		),
		"estudios" => array(
			"info" => "SELECT nomest as nombre, pais, direccion FROM ESTUDIOS_GRABACION WHERE NomEst LIKE ?",
			"albumes" => "SELECT nomalb as nombre, nomban as banda FROM ESTUDIOS_ALBUMES WHERE NomEst LIKE ?",
			"bandas" => "",
			"canciones" => "",
			"discograficas" => "",
			"generos" => "",
			"musicos" => "",
			"temas" => ""
		),
		"generos" => array(
			"info" => "SELECT nomgen as nombre, descrip, imagen FROM GENEROS WHERE NomGen LIKE ?",
			"albumes" => "SELECT nomalb as nombre, nomban as banda, estrellas FROM GENEROS_ALBUMES WHERE NomGen LIKE ?",
			"bandas" => "SELECT nomban as nombre, estrellas FROM GENEROS_BANDAS WHERE NomGen LIKE ?",
			"canciones" => "",
			"discograficas" => "",
			"estudios" => "",
			"musicos" => "",
			"temas" => ""
		),
		"musicos" => array(
			"info" => "SELECT nommus as nombre, imagen, sexo, dianac, mesnac, anionac, diadef, mesdef, aniodef, pais, origen FROM MUSICOS WHERE NomMus LIKE ?",
			"albumes" => "",
			"canciones" => "",
			"bandas" => "SELECT nomban as nombre, anioinic, aniofin FROM MUSICOS_BANDAS WHERE NomMus LIKE ?",
			"discograficas" => "",
			"estudios" => "",
			"generos" => "",
			"roles" => "SELECT nomalb as nombre, nomban as banda, rol FROM ROLES_MUSICOS_ALBUMES WHERE NomMus LIKE ?",
			"temas" => ""
		),
		"canciones" => array(
			"info" => "",
			"albumes" => "",
			"bandas" => "",
			"discograficas" => "",
			"estudios" => "",
			"generos" => "",
			"musicos" => ""
		),
		"temas" => array(
			"info" => "",
			"bandas" => "",
			"discograficas" => "",
			"estudios" => "",
			"generos" => "",
			"musicos" => ""
		)
	);


	$tablas = [
		['name'=>"BANDAS",
		 'csv'=>$_SERVER['DOCUMENT_ROOT']."/Metalist/backups/bandas.csv",
		 'create'=>"create table if not exists BANDAS ()",
		 'insert'=>"insert into BANDAS values(?,?,?,?,?,?,?,?,?,?)",
		 'update'=>"update BANDAS set Pais=?, Origen=?, NumEscuchasMax=?, Imagen=?, Estatus=?, Descrip=?, LinkWeb=?, LinkSpotify=? WHERE NomBan=?",
		 'insertBind'=>"sssisssss",
		 'updateBind'=>"ssissssss",
		 'campos'=>["NomBan","Pais","Origen","NumEscuchasMax","Imagen","Estatus","Descrip","LinkWeb","LinkSpotify"]
		],
		['name'=>"ALBUMES",
		 'csv'=>$_SERVER['DOCUMENT_ROOT']."/Metalist/backups/albumes.csv",
		 'create'=>"create table if not exists ALBUMES ()",
		 'insert'=>"insert into ALBUMES values(?,?,?,?,?,?,?,?,?,?)",
		 'update'=>"update ALBUMES set Pais=?, Origen=?, NumEscuchasMax=?, Imagen=?, Estatus=?, Descrip=?, LinkWeb=?, LinkSpotify=? WHERE NomBan=?",
		 'insertBind'=>"sssisssss",
		 'updateBind'=>"ssissssss",
		 'campos'=>["NomBan","NomAlb","Descrip","Imagen","TipoAlb","EnLista","Anio","Mes","Dia","NumEscuchasMax","LinkSpotify","LinkAmazon","Duracion"]
		],
		['name'=>"Profesores",
		 'csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Profesores.csv",
		 'create'=>"create table if not exists PROFESORES (APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO))",
		 'insert'=>"insert into PROFESORES values(?,?,?,?)",
		 'select'=>"Select * from PROFESORES",
		 'drop'=>"drop table PROFESORES",
		 'delete'=>"delete from PROFESORES",
		 'bind'=>"sssi",
		 'campos'=>["APELLIDOS","NOMBRE","DNI","COD_DPTO"]
		],
		['name'=>"Alumnos",
		 'csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Alumnos.csv",
		 'create'=>"create table if not exists ALUMNOS (ALUMNO VARCHAR(7) REFERENCES MATRICULAS(ALUMNO), APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, NIE VARCHAR(8) NOT NULL)",
		 'insert'=>"insert into ALUMNOS values(?,?,?,?,?)",
		 'select'=>"Select * from ALUMNOS",
		 'drop'=>"drop table ALUMNOS",
		 'delete'=>"delete from ALUMNOS",
		 'bind'=>"isssi",
		 'campos'=>["ALUMNO","APELLIDOS","NOMBRE","DNI","NIE"]
		],
		['name'=>"Libros",
		 'csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/AltaLibros.csv",
		 'create'=>"create table if not exists LIBROS (COD_LIBRO VARCHAR(16) PRIMARY KEY, TITULO VARCHAR(100) NOT NULL, AUTOR VARCHAR(100), MATERIA VARCHAR(30), EDITORIAL VARCHAR(25), A_EDICION VARCHAR(4), SOPORTE_M ENUM('SI','NO') DEFAULT 'NO', USUARIO ENUM('ALUMNO','PROFESOR','CONSULTA'), COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO), ESTADO ENUM('BUENO','MALO') DEFAULT 'BUENO')",
		 'insert'=>"insert into LIBROS values(?,?,?,?,?,?,?,?,?,?)",
		 'select'=>"Select * from LIBROS",
		 'drop'=>"drop table LIBROS",
		 'delete'=>"delete from LIBROS",
		 'bind'=>"sssssissis",
		 'campos'=>["COD_LIBRO","TITULO","AUTOR","MATERIA","EDITORIAL","A_EDICION","SOPORTE_M","USUARIO","COD_DPTO","ESTADO"]
		],
		['name'=>"Reservas",
		 'csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Reservas.csv",
		 'create'=>"create table if not exists RESERVAS (COD_LIBRO VARCHAR(16) PRIMARY KEY REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_FIN DATE NOT NULL)",
		 'insert'=>"insert into RESERVAS values(?,?,?)",
		 'select'=>"Select * from RESERVAS",
		 'drop'=>"drop table RESERVAS",
		 'delete'=>"delete from RESERVAS",
		 'bind'=>"sss",
		 'campos'=>["COD_LIBRO","DNI","FECHA_FIN"]
		],
		['name'=>"Préstamos",
		 'csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Prestamos.csv",
		 'create'=>"create table if not exists PRESTAMOS (NUM_PREST INT NOT NULL AUTO_INCREMENT, COD_LIBRO VARCHAR(16) REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_RECOG DATE NOT NULL, FECHA_DEVOL DATE NOT NULL, DEVUELTO ENUM('Si','No') DEFAULT 'No', PRIMARY KEY(NUM_PREST))",
		 'insert'=>"insert into PRESTAMOS values(?,?,?,?,?,?)",
		 'select'=>"Select * from PRESTAMOS",
		 'drop'=>"drop table PRESTAMOS",
		 'delete'=>"delete from PRESTAMOS",
		 'bind'=>"isssss",
		 'campos'=>["NUM_PREST","COD_LIBRO","DNI","FECHA_RECOG","FECHA_DEVOL","DEVUELTO"]
		]
	];

	//DECODIFICADOR DE API_KEY
	function checkTime($key){
		$local = [9,6,5,3,2,4,1,0,7,8];
  	$corresp = ['oev','gan','fbs','ump','lza','ktr','xdh','iyj','qwc','btz'];
		$segundos = 3;
		$fecha = [];
		$key = str_split($key);
		$key = array_chunk($key,3);
		for($i=0; $i<count($key); $i++){
			$key[$i] = implode("",$key[$i]);
		}
		for($i=0; $i<count($key); $i++){
			for($j=0; $j<count($corresp); $j++){
				if($key[$i]==$corresp[$j] && is_string($key[$i])){
					$key[$i]=$j;
				}
			}
		}
		for($i=0; $i<count($key); $i++){
			$fecha[$local[$i]] = $key[$i];
		}
		ksort($fecha);
		$fecha = intval(implode("",$fecha));
		$dif = strtotime("now")-$fecha;
		$verif = ($dif<$segundos) ? 1 : 0;
		if($verif==1) return true;
		return false;
	}
?>