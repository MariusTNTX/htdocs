<!-- EJERCICIO 10:

Crear un array bidimensional de 3 filas y 5 columnas 
introduciendo como valores los 15 primeros numeros 
naturales desde el 1. Después simular la salida de 
la función print_r.  -->

<html>
<head>
	<style>
		table{border-collapse: collapse;}
		td{border: 2px solid black;}
	</style>
</head>
<body>
	<h1>Versión Manual de print_r():</h1>
	<?
		$num=1; //-> Número de inicio
		$tab="&nbsp;&nbsp;&nbsp;&nbsp;";
		
		//Inicio del array principal
		echo "Array<br>(<br>"; 

		for($i=0; $i<3; $i++){
			//Inicio del array secundario
			echo $tab."[$i] => Array<br>".$tab.$tab."(<br>"; 
			
			for($j=0; $j<5; $j++){
				$array[$i][$j]=$num;
				//Contenido del array secundario
				echo $tab.$tab.$tab."[$j] => $num<br>"; 
				$num++;
			}
			//Fin del array secundario
			echo $tab.$tab.")<br><br>"; 
		}
		//Fin del array principal
		echo ")<br>1"; 
	?>

	<h1>Versión Tabla</h1>
	<table>
		<?
			foreach($array as $iFila => $vFila){
				echo "<tr>";
				foreach($vFila as $iCol => $vCol){
					echo '<td>'.$vCol.'</td>';
				}
				echo "</tr>";
			}
		?>
	</table>
</body>
</html>