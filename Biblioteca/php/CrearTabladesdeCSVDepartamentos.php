<?
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="admin";
	$dbname="BibliotecaMolinaM";

	$csv="../csv/Departamentos.csv";
	$createTable="create table if not exists DEPARTAMENTOS (COD_DPTO VARCHAR(2) PRIMARY KEY, NOMBRE VARCHAR(50) NOT NULL, CENTRO ENUM('CIFP1','Albaladejito','Pedro Mercedes'), DNI_JFK VARCHAR(10), PASSWORD VARCHAR(100))";
	$insert="insert into DEPARTAMENTOS values(?,?,?,?,?)";
	$bind="issss";

	
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


	//Creamos la tabla destino de los datos
	if (!mysqli_query($c1,$createTable)){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	} else echo utf8_encode('Tabla creada').'<br>';

	//Importacion de datos desde un fichero a una tabla
	$fic = fopen($csv,'r');
	fgetcsv($fic,0,';');
	while($reg = fgetcsv($fic,0,';')){
		$stmt = mysqli_prepare($c1,$insert);
		$stmt->bind_param($bind, utf8_encode($reg[0]), utf8_encode($reg[1]), utf8_encode($reg[2]), utf8_encode($reg[3]), utf8_encode($reg[4]));
		if (!$stmt->execute()){
			echo 'error en insert: '.mysqli_error($c1).'<br>';
			exit(-1);
		}
		$stmt->close();
	}
	echo utf8_encode('Importación realizada').'<br>';

	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
