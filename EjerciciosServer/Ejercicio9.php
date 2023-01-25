<!-- EJERCICIO 9:

Crear un script que nos construya una tabla cuyas celdas 
tengan como color de fondo una escala de grises rgb desde 
0,0,0 hasta 255,255,255. Serán saltos de 5 unidades de 
rgb (51 celdas). -->

<html>
<head>
	<style>
		td{
			border: 1px solid black;
			width: 20px;
			height: 20px
		}
	</style>
</head>
<body>
	<h1>Versión en Línea</h1>
	<table>
		<?	//Por cada codigo RGB imprime una celda con su codigo y color
			for($i=0; $i<=255; $i+=5){
				echo "<td style='background-color: rgb($i,$i,$i);'></td>";
			}
		?>
	</table>
	<br><br>
	
	<h1>Versión en Tabla</h1>
	<table>
	<?	//Se recorren los codigos RGB de 10 en 10 y se introducen en una fila
		for($i=0; $i<=255; $i+=50){
			echo "<tr>";
			//Se imprime una celda por cada codigo RGB de los 10 que debe recorrer siempre que no sobrepase el 255
			for($j=$i; $j<($i+50) && $j<=255; $j+=5){
				echo "<td style='background-color: rgb($j,$j,$j);'></td>";
			}
			echo "</tr>";
		}
	?>
	</table>
</body>
</html>