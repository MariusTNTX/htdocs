<!--EJERCICIO 11:

Crear un script con una tabla html de 1 fila y 6 columnas conteniendo 
cada celda un numero aleatorio entre 1 y 49, evitando que un número se 
repita y apareciendo ordenado de menor a mayor.-->

<html>
<head>
	<style>
		table{border-collapse: collapse;}
		td{border: 1px solid black;}
	</style>
</head>
<body>
	<table>
		<tr>
			<?
				//Se inicializa la variable array
				$numeros = array();
				
				for($i=0; $i<6; $i++){
					do{ //Se almacena un número aleatorio
						$num=rand(1,49);
						//Si el array no contiene ese número se inserta
						if(array_search($num,$numeros)!=$num){
							$numeros[$i]=$num;
						} else $num=0; //Si no se repite el bucle
					}while($num==0);
				}
				
				//Se ordena el array en orden ascendente
				sort($numeros);
				
				//Se imprime una celda por cada valor
				foreach($numeros as $vlr){
					echo "<td>$vlr</td>";
				}
			?>
		</tr>
	</table>
</body>
</html>