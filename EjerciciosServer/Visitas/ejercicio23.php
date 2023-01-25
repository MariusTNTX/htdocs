<?
	//1.---CREACIÓN/LECTURA DE FICHERO---
	
	$fic = fopen("visitas.txt","c+");
	if(filesize("visitas.txt")>0){
		$total = unserialize(fread($fic,filesize("visitas.txt")));
	}
	
	//2.---INCLUSIÓN DEL NUEVO REGISTRO---
	
	if(is_numeric($total[0][date("d-m-Y")])) $total[0][date("d-m-Y")]++;
	else $total[0][date("d-m-Y")] = 1;
	
	if(!is_array($total[1]) || !in_array($_SERVER['REMOTE_ADDR'],$total[1])){
		$total[1][] = $_SERVER['REMOTE_ADDR'];
	}
	
	//3.---IMPRESIÓN DE DATOS---
	
		//Estilos
		$stlH1="style='text-align: center; margin: 40px 0;'";
		$stlT="style='border-collapse: collapse; margin: 0 auto; min-width: 200px;'";
		$stlTH="style='background-color: LightCyan; border: 1px solid black; font-size: 24px;'";
		$stlTD="style='border: 1px solid black; font-size: 20px;'";
		
		//3.1. Visitas Totales
		$visitas=0;
		foreach($total[0] as $num) $visitas += $num;
		echo "<h1 $stlH1>Visitas Totales: $visitas</h1>";
		
		//3.2. Visitas Únicas
		echo "<h1 $stlH1>Visitas Únicas: ".count($total[1])."</h1>";
		
		//3.3. Visitas por fecha
		echo "<table $stlT><tr><th $stlTH>Fecha</th><th $stlTH>Visitas</th></tr>";
		foreach($total[0] as $fec => $num) echo "<tr><td $stlTD>$fec</td><td $stlTD>$num</td></tr>";
		echo "</table>";
	
	//4.---ESCRITURA DEL NUEVO REGISTRO---
	
	//Se borra el contenido y Se sitúa el puntero al inicio
	ftruncate($fic,filesize("visitas.txt")); 
	rewind($fic);
	
	//Se escribe el array y se cierra
	fwrite($fic,serialize($total)); //Se escribe el array
	fclose($fic); //Se cierra el puntero a archivo
?>