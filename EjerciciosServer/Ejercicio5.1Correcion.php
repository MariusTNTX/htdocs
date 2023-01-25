<!--Versión A
Crear un formulario con 3 items numericos enteros (3 txtField) y un botón llamado Ordenar.
Al pulsar Ordenar ya no aparecerá el formulario, sino que apareceran los numeros
ordenados de menor a mayor (ej.: 3, 4, 7). -->

<html>
<body>

	<?
	if(isset($_GET['ordenar'])){
		$n1 = $_GET["n1"];
		$n2 = $_GET["n2"];
		$n3 = $_GET["n3"];
		$menor=min($n1,$n2,$n3);
		$mayor=max($n1,$n2,$n3);
		$medio=($n1+$n2+$n3)-($mayor-$menor);
		echo $menor.', '.$medio.', '.$mayor;
	} else {
	?>

	<form action="" method="get">
		<input type="text" name="n1">
		<input type="text" name="n2">
		<input type="text" name="n3">
		<br><br>
		<input type="submit" name="ordenar" value="Ordenar">
	</form>
	
	<?
	}
	?>
</body>
</html>