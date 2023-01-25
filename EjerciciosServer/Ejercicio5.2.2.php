<!--Versión B
Ordenamos varios los mismos ítems de texto y colocamos dos botones. Uno que nos permita 
ordenar en orden creciente y otro en decreciente. -->

<html>
<body>

	<?
	if(isset($_GET['creciente'])) {
		$n1 = $_GET["n1"];
		$n2 = $_GET["n2"];
		$n3 = $_GET["n3"];
		$menor=min($n1,$n2,$n3);
		$mayor=max($n1,$n2,$n3);
		$medio=($n1+$n2+$n3)-($mayor+$menor);
		echo $menor.', '.$medio.', '.$mayor;
	} elseif(isset($_GET['decreciente'])) {
		$n1 = $_GET["n1"];
		$n2 = $_GET["n2"];
		$n3 = $_GET["n3"];
		$menor=min($n1,$n2,$n3);
		$mayor=max($n1,$n2,$n3);
		$medio=($n1+$n2+$n3)-($mayor+$menor);
		echo $mayor.', '.$medio.', '.$menor;
	} else {
	?>
	
	<form action="" method="get">
		<input type="text" name="n1">
		<input type="text" name="n2">
		<input type="text" name="n3">
		<br><br>
		<input type="submit" name="creciente" value="Creciente">
		<input type="submit" name="decreciente" value="Decreciente">
	</form>
	
	<?
	}
	?>
	
</body>
</html>