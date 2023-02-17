<?
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="1234";

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';
	
	if (!mysqli_query($c1,'create database if not exists BibliotecaAngelM')){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Base de datos creada').'<br>';

	if (!mysqli_query($c1,'use BibliotecaAngelM')){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Base de datos puesta en uso').'<br>';


	//Creamos la tabla destino de los datos
	if (!mysqli_query($c1,"create table if not exists libros (COD_LIBRO varchar(16) primary key, TITULO varchar(100), AUTOR varchar(100), MATERIA varchar(30), EDITORIAL varchar(25),A_EDICION varchar(4),SOPORTE_M enum('SI','NO'),USUARIO enum('ALUMNO','PROFESOR','CONSULTA'),COD_DPTO tinyint(2),ESTADO enum('BUENO','MALO'))")){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Tabla creada').'<br>';

	//Importacion de datos desde un fichero a una tabla	
	if (!mysqli_query($c1,"LOAD DATA LOCAL INFILE '" . $_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/AltaLibros.csv" . "'
             into table libros
             fields terminated by ';'
             lines terminated by '\n'
             ignore 2 rows")){
		echo mysqli_error($c1).'<br>';
		exit(-1);
    }
    echo utf8_encode('Importación realizada').'<br>';
	
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
