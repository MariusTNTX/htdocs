<?
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="1234";
	$dbname="MolinaM"

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';
	
	if (!mysqli_query($c1,'create database if not exists MolinaM')){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Base de datos creada').'<br>';

	if (!mysqli_query($c1,'use MolinaM')){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Base de datos puesta en uso').'<br>';


	//Creamos la tabla destino de los datos
	if (!mysqli_query($c1,"create table if not exists DEPARTAMENTOS (COD_DPTO VARCHAR(2) PRIMARY KEY, NOMBRE VARCHAR(50) NOT NULL, CENTRO ENUM('CIFP1','Albaladejito','Pedro Mercedes'), DNI_JFK VARCHAR(10), PASSWORD VARCHAR(100))")){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Tabla creada').'<br>';

	//Importacion de datos desde un fichero a una tabla	
	if (!mysqli_query($c1,"LOAD DATA LOCAL INFILE '" . $_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/Alumnos.csv" . "'
             into table alumnos
             fields terminated by ';'
             lines terminated by '\n'")){
		echo mysqli_error($c1).'<br>';
		exit(-1);
  }
  echo utf8_encode('Importaci�n realizada').'<br>';

	$file = fopen($_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/csv/Departamentos.csv","r+");
	while(feof($file)){
		$reg = fread($file,filesize($_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/csv/Departamentos.csv"))
	}
	
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
