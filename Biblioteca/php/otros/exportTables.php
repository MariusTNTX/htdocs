<?
	include("calcFechas.php");

	//CREACIÓN DE BASE DE DATOS

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';

	//Se usa la base de datos
	if (!mysqli_query($c1,'use '.$dbname)){
		echo mysqli_error($c1).'<br>';
		exit(-1);
	} else echo utf8_encode('Base de datos puesta en uso').'<br>';

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
