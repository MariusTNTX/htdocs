<?
	//VARIABLES: 
	$array = []; //Tabla de valores
	$sumatorios = []; //Array de sumatorios de las filas
	$sumaDiagonales = 0; //Sumatorio de las dos diagonales

	//CREACIÓN, ALMACENAMIENTO DE SUMATORIOS E IMPRESIÓN DEL ARRAY:
	echo "<table>";
	//Se recorren las filas:
	for($f=0; $f<6; $f++){
		//Se genera un nuevo array dentro del indice de la fila correspondiente
		$array[$f] = [];
		echo "<tr>";
		//Se recorren las columnas: 
		for($c=0; $c<6; $c++){
			//Se genera el número aleatorio en su celda correspondiente: 
			$array[$f][$c] = rand(1,9);
			//Si los indices coinciden (diagonal izquierda) o si suman 5 (diagonal derecha) se aumenta el sumatorio de diagonales:
			if($f == $c || ($f+$c) == 5){
				$sumaDiagonales += $array[$f][$c];
			}
			//Se imprime la celda con su valor:
			echo "<td>".$array[$f][$c]."&nbsp;<td>";
		}
		$sumatorios[$f] = array_sum($array[$f]);
		echo "</tr>";
	}
	echo "</table>";
	
	//Se almacenan los valores máximos y mínimos
	$min = min($sumatorios);
	$max = max($sumatorios);

	//FILAS CON SUMATORIO MENOR:
	echo "<h2>Filas con sumatorio menor:</h2>";
	//Se recorren los valores del sumatorio, y se imprimen los indices de las filas cuyo valor cooincida con el mínimo:
	for($i=0; $i<count($sumatorios); $i++){
		if($sumatorios[$i]==$min)
			echo " --> ".($i+1).'<br>';
	}

	//FILAS CON SUMATORIO MAYOR:
	echo "<h2>Filas con sumatorio mayor:</h2>";
	//Se recorren los valores del sumatorio, y se imprimen los indices de las filas cuyo valor cooincida con el máximo:
	for($i=0; $i<count($sumatorios); $i++){
		if($sumatorios[$i]==$max)
			echo " --> ".($i+1).'<br>';
	}

	//SUMATORIO DE DIAGONALES:
	echo "<h2>Suma de las dos diagonales: ".$sumaDiagonales."</h2>";
?>