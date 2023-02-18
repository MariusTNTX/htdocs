<?
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="1234";

	$c1 = mysqli_connect($dbhost,$dbuser,$dbpass,"BibliotecaAngelM") or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
	echo utf8_encode('Conexión establecida').'<br>';

	//Exportacion de datos desde una tabla a un fichero	
	$f1=fopen($_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/Alumnos.csv","w+");
	$result1=mysqli_query($c1,'Select * from alumnos');
	while ($fila=mysqli_fetch_row($result1)){
		fputcsv($f1,$fila,";");
	}
	fclose($f1);
/*	
	if(!mysqli_query($c1,"Select * into outfile '" . $_SERVER['DOCUMENT_ROOT'] . "/Biblioteca/Alumnos.csv" . "'
             fields terminated by ';'
             lines terminated by '\r\n'
             from alumnos")){
		echo mysqli_error($c1);
    	exit(-1);
    }
*/
    echo utf8_encode('Fichero CSV creado').'<br>';
		
	//Liberamos gestor de conexion
	mysqli_close($c1);
?>
