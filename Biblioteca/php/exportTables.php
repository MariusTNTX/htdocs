<?
	include("calcFechas.php");

	//DATOS DE LAS TABLAS

	$tablas = [
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Matriculas.csv",
		 'create'=>"create table if not exists MATRICULAS (ALUMNO VARCHAR(7), ESTUDIOS VARCHAR(100) NOT NULL, GRUPO VARCHAR(10), PRIMARY KEY(ALUMNO,GRUPO))",
		 'insert'=>"insert into MATRICULAS values(?,?,?)",
		 'select'=>"Select * from MATRICULAS",
		 'bind'=>"iss",
		 'campos'=>["ALUMNO","ESTUDIOS","GRUPO"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Departamentos.csv",
		 'create'=>"create table if not exists DEPARTAMENTOS (COD_DPTO VARCHAR(2) PRIMARY KEY, NOMBRE VARCHAR(50) NOT NULL, CENTRO ENUM('CIFP1','Albaladejito','Pedro Mercedes'), DNI_JFK VARCHAR(10), PASSWORD VARCHAR(100))",
		 'insert'=>"insert into DEPARTAMENTOS values(?,?,?,?,?)",
		 'select'=>"Select * from DEPARTAMENTOS",
		 'bind'=>"issss",
		 'campos'=>["COD_DPTO","CENTRO","DNI_JFK","PASSWORD"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Profesores.csv",
		 'create'=>"create table if not exists PROFESORES (APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO))",
		 'insert'=>"insert into PROFESORES values(?,?,?,?)",
		 'select'=>"Select * from PROFESORES",
		 'bind'=>"sssi",
		 'campos'=>["APELLIDOS","NOMBRE","DNI","COD_DPTO"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Alumnos.csv",
		 'create'=>"create table if not exists ALUMNOS (ALUMNO VARCHAR(7) REFERENCES MATRICULAS(ALUMNO), APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, NIE VARCHAR(8) NOT NULL)",
		 'insert'=>"insert into ALUMNOS values(?,?,?,?,?)",
		 'select'=>"Select * from ALUMNOS",
		 'bind'=>"isssi",
		 'campos'=>["ALUMNO","APELLIDOS","NOMBRE","DNI","NIE"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/AltaLibros.csv",
		 'create'=>"create table if not exists LIBROS (COD_LIBRO VARCHAR(16) PRIMARY KEY, TITULO VARCHAR(100) NOT NULL, AUTOR VARCHAR(100), MATERIA VARCHAR(30), EDITORIAL VARCHAR(25), A_EDICION VARCHAR(4), SOPORTE_M ENUM('SI','NO') DEFAULT 'NO', USUARIO ENUM('ALUMNO','PROFESOR','CONSULTA'), COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO), ESTADO ENUM('BUENO','MALO') DEFAULT 'BUENO')",
		 'insert'=>"insert into LIBROS values(?,?,?,?,?,?,?,?,?,?)",
		 'select'=>"Select * from LIBROS",
		 'bind'=>"sssssissis",
		 'campos'=>["COD_LIBRO","TITULO","AUTOR","MATERIA","EDITORIAL","A_EDICION","SOPORTE_M","USUARIO","COD_DPTO","ESTADO"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Reservas.csv",
		 'create'=>"create table if not exists RESERVAS (COD_LIBRO VARCHAR(16) PRIMARY KEY REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_FIN DATE NOT NULL)",
		 'insert'=>"insert into RESERVAS values(?,?,?)",
		 'select'=>"Select * from RESERVAS",
		 'bind'=>"sss",
		 'campos'=>["COD_LIBRO","DNI","FECHA_FIN"]
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/csv/Prestamos.csv",
		 'create'=>"create table if not exists PRESTAMOS (NUM_PREST INT NOT NULL AUTO_INCREMENT, COD_LIBRO VARCHAR(16) REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_RECOG DATE NOT NULL, FECHA_DEVOL DATE NOT NULL, DEVUELTO ENUM('Si','No') DEFAULT 'No', PRIMARY KEY(NUM_PREST))",
		 'insert'=>"insert into PRESTAMOS values(?,?,?,?,?,?)",
		 'select'=>"Select * from PRESTAMOS",
		 'bind'=>"isssss",
		 'campos'=>["NUM_PREST","COD_LIBRO","DNI","FECHA_RECOG","FECHA_DEVOL","DEVUELTO"]
		]
	];

	//CREACIÓN DE BASE DE DATOS

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';

	foreach($tablas as $tbl){
		//Exportacion de datos desde una tabla a un fichero	
		$fic=fopen($tbl['csv'], "w+");
		$result=mysqli_query($c1, $tbl['select']);
		fputcsv($fic, $tbl['campos'], ";");
		while ($reg = mysqli_fetch_row($result)){
			foreach($reg as $i=>$r) $reg[$i] = $reg[$i];
			fputcsv($fic, $reg, ";");
		}
		fclose($fic);
		echo utf8_encode('Fichero CSV creado').'<br>';
	}
		
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
