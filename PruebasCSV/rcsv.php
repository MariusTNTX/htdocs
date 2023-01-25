<?
	/* Este programa asume que el fichero leido contiene un header que le 
	   indica la códificación por defecto UTF-8. En caso de no tenerla se 
	   deberá usar la función "utf8_encode()" para codificar cada String a 
	   UTF-8. Para codificar arrays de Strings más fácilmente puede usarse
	   "$array = array_map("utf8_encode", $array)". */
	
	/* Crear función fgetcsv2() que recupere una línea del csv y la lea 
	   letra por letra obteniendo todas las letras en base a su código 
	   (decodificación) */
	
	/*function fgetcsvstr($fic,$t,$sep){
		$linea = fgetcsv($fic,$t,$sep);
		//return mb_convert_encoding($linea, "UTF-8");
		$resul="";
		for($i=0; $i<strlen($linea);$i++){
			$resul.=chr(ord(substr($linea,$i,1)));
		}
		return $resul;
	}*/
	
	$archivo = "USUARIOS.csv";
	$fic = fopen($archivo,"r");
	$campos = fgetcsv($fic,1000,";");
	$campos = array_map("utf8_encode", $campos);
	$campoMultiple=(count($campos)>2);
	
	while(!feof($fic)){
		$reg = fgetcsv($fic,1000,";");
		if(is_bool($reg)) continue; //Si está vacío no lo escribe
		$reg = array_map("utf8_encode", $reg);
		if($campoMultiple){
			for($i=1; $i<count($campos); $i++){
				$registros[$reg[0]][$campos[$i]] = $reg[$i];
			}  
		} else $registros[$reg[0]] = $reg[1]; 
	}

	fclose($fic);
?>
<pre><?=print_r($registros)?></pre>