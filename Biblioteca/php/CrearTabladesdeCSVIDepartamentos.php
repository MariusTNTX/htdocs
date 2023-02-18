<?
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="1234";

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexi�n establecida').'<br>';
	
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
	if (!mysqli_query($c1,'create table if not exists departamentos (COD_DPTO tinyint(2) primary key, NOMBRE varchar(40), CENTRO varchar(15), DNI_JFP varchar(9), PASSWORD varchar(70))')){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	}
	echo utf8_encode('Tabla creada').'<br>';

	//Insertamos filas en la tabla
	$fcsv=fopen($_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/Departamentos.csv","r");
	$fila=fgetcsv($fcsv,0,";");
	while ($fila=fgetcsv($fcsv,0,";")){
		$stmt=mysqli_prepare($c1,"insert into departamentos values(?,?,?,?,?)");
		mysqli_stmt_bind_param($stmt,"issss",$fila[0],$fila[1],$fila[2],$fila[3],$fila[4]);
		if(!mysqli_execute($stmt)){
			echo mysqli_error($c1).'<br>';
			exit(-1);
		}
		echo utf8_encode('Fila insertada').'<br>';		
	}
	echo utf8_encode('Insercci�n finalizada').'<br>';

/*	
	//Alternativamente
	//Importacion de datos desde un fichero a una tabla	
	if (!mysqli_query($c1,"LOAD DATA LOCAL INFILE '" . $_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/Departamentos.csv" . "'
             into table departamentos
             fields terminated by ';'
             lines terminated by '\n'
             ignore 1 rows")){
		echo mysqli_error($c1).'<br>';
		exit(-1);
    }
    echo utf8_encode('Importaci�n realizada').'<br>';
*/	
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>