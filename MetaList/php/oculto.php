<?
  $dbhost="localhost";
	$dbuser="root";
	$dbpass="admin";
	$dbname="MetaList";
	$apikey="TheBig4000MetaListMariusTNTX";
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