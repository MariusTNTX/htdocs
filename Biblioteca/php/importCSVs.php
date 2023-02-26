<?
	//CREDENCIALES (UBICAR EN INCLUDES)

	$dbhost="localhost";
	$dbuser="root";
	$dbpass="admin";
	$dbname="BibliotecaMolinaM";

	//DATOS DE LAS TABLAS

	$tablas = [
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Matriculas.csv",
		 'create'=>"create table if not exists MATRICULAS (ALUMNO VARCHAR(7), ESTUDIOS VARCHAR(100) NOT NULL, GRUPO VARCHAR(10), PRIMARY KEY(ALUMNO,GRUPO))",
		 'insert'=>"insert into MATRICULAS values(?,?,?)",
		 'select'=>"Select * from MATRICULAS",
		 'bind'=>"iss"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Departamentos.csv",
		 'create'=>"create table if not exists DEPARTAMENTOS (COD_DPTO VARCHAR(2) PRIMARY KEY, NOMBRE VARCHAR(50) NOT NULL, CENTRO ENUM('CIFP1','Albaladejito','Pedro Mercedes'), DNI_JFK VARCHAR(10), PASSWORD VARCHAR(100))",
		 'insert'=>"insert into DEPARTAMENTOS values(?,?,?,?,?)",
		 'select'=>"Select * from DEPARTAMENTOS",
		 'bind'=>"issss"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Profesores.csv",
		 'create'=>"create table if not exists PROFESORES (APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO))",
		 'insert'=>"insert into PROFESORES values(?,?,?,?)",
		 'select'=>"Select * from PROFESORES",
		 'bind'=>"sssi"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Alumnos.csv",
		 'create'=>"create table if not exists ALUMNOS (ALUMNO VARCHAR(7) REFERENCES MATRICULAS(ALUMNO), APELLIDOS VARCHAR(50), NOMBRE VARCHAR(30) NOT NULL, DNI VARCHAR(10) PRIMARY KEY, NIE VARCHAR(8) NOT NULL)",
		 'insert'=>"insert into ALUMNOS values(?,?,?,?,?)",
		 'select'=>"Select * from ALUMNOS",
		 'bind'=>"isssi"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Libros1.csv",
		 'create'=>"create table if not exists LIBROS (COD_LIBRO VARCHAR(16) PRIMARY KEY, TITULO VARCHAR(100) NOT NULL, AUTOR VARCHAR(100), MATERIA VARCHAR(30), EDITORIAL VARCHAR(25), A_EDICION VARCHAR(4), SOPORTE_M ENUM('SI','NO') DEFAULT 'NO', USUARIO ENUM('ALUMNO','PROFESOR','CONSULTA'), COD_DPTO VARCHAR(2) REFERENCES DEPARTAMENTOS(COD_DPTO), ESTADO ENUM('BUENO','MALO') DEFAULT 'BUENO')",
		 'insert'=>"insert into LIBROS values(?,?,?,?,?,?,?,?,?,?)",
		 'select'=>"Select * from LIBROS",
		 'bind'=>"sssssissis"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Reservas.csv",
		 'create'=>"create table if not exists RESERVAS (COD_LIBRO VARCHAR(16) PRIMARY KEY REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_FIN DATE NOT NULL)",
		 'insert'=>"insert into RESERVAS values(?,?,?)",
		 'select'=>"Select * from RESERVAS",
		 'bind'=>"sss"
		],
		['csv'=>$_SERVER['DOCUMENT_ROOT']."/Biblioteca/csv/Prestamos.csv",
		 'create'=>"create table if not exists PRESTAMOS (NUM_PREST INT NOT NULL AUTO_INCREMENT, COD_LIBRO VARCHAR(16) REFERENCES LIBROS(COD_LIBRO), DNI VARCHAR(10), FECHA_RECOG DATE NOT NULL, FECHA_DEVOL DATE NOT NULL, DEVUELTO ENUM('Si','No') DEFAULT 'No', PRIMARY KEY(NUM_PREST))",
		 'insert'=>"insert into PRESTAMOS values(?,?,?,?,?,?)",
		 'select'=>"Select * from PRESTAMOS",
		 'bind'=>"isssss"
		]
	];

	//CREACIÓN DE BASE DE DATOS

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';
	
	if (!mysqli_query($c1,'create database if not exists '.$dbname)){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	} else echo utf8_encode('Base de datos creada').'<br>';

	if (!mysqli_query($c1,'use '.$dbname)){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	} else echo utf8_encode('Base de datos puesta en uso').'<br>';


	//CREACIONES E IMPORTACIONES

	foreach($tablas as $tbl){
		//Creamos la tabla destino de los datos
		if (!mysqli_query($c1,$tbl['create'])){
			echo mysqli_error($c1).'<br>';
			exit(-1);
		} else echo utf8_encode('Tabla creada').'<br>';

		//Importacion de datos desde un fichero a una tabla
		$fic = fopen($tbl['csv'],'r');
		fgetcsv($fic,0,';');
		while($reg = fgetcsv($fic,0,';')){
			$stmt = mysqli_prepare($c1,$tbl['insert']);
			switch (strlen($tbl['bind'])) {
				case 3: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2]);
					break;
				case 4: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3]);
					break;
				case 5: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4]);
					break;
				case 6: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5]);
					break;
				case 10: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5], $reg[6], $reg[7], $reg[8], $reg[9]);
					break;
				default: echo 'Error en Switch-Bind: No existe la opción para importar '.strlen($tbl['bind']).' columnas<br>';
					break;
			}
			if (!$stmt->execute()){
				echo 'error en insert: '.mysqli_error($c1).'<br>';
				exit(-1);
			}
			$stmt->close();
		}
		echo utf8_encode('Importación realizada').'<br>';
	}
	
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
