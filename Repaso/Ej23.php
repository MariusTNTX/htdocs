<?
	$totales = 0; //Sumatorio de frecuencias de fecha
	$unicos = 0; //Array de IPs
	$visitas = []; //Array de Fechas y frecuencia
	
	//Se obtiene/crea el array del archivo
	$fic = fopen('regis.txt','c+');
	if(filesize('regis.txt')==0) $regis = ['frec'=>[], 'ips'=>[]];
	else $regis = unserialize(fread($fic,filesize('regis.txt')));

	//Si la ip no esta en el array ips se añade
	if(!in_array($_SERVER['REMOTE_ADDR'],$regis['ips'])){
		array_push($regis['ips'],$_SERVER['REMOTE_ADDR']);
	} 
	
	//Si la fecha esta en el array frec se suma 1, sino se añade con 1
	if(array_key_exists(date('d-m-Y'),$regis['frec'])){
		$regis['frec'][date('d-m-Y')]++;
	} else {
		$regis['frec'][date('d-m-Y')]=1;
	}
	
	//Se muestra la información del array
	echo "<br>VISITAS TOTALES: ".array_sum($regis['frec']).'<br><br>';
	echo "VISITAS ÚNICAS: ".count($regis['ips']).'<br><br><br>';
	echo "<table style='width:250px;text-align:center;'><tr><th>Fecha</th><th>Número de visitas</th></tr>";
	foreach($regis['frec'] as $fec => $num){
		echo "<tr><td>$fec</td><td>$num</td></tr>";
	}
	echo "</table>";
	
	//Se almacena la información del array
	ftruncate($fic,filesize('regis.txt'));
	rewind($fic);
	fwrite($fic,serialize($regis));
	fclose($fic);
?>