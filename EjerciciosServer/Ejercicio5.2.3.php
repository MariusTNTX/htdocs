<!--Versión B
Ordenamos varios los mismos ítems de texto y colocamos dos botones. Uno que nos permita 
ordenar en orden creciente y otro en decreciente. -->

<html>
<body>

	<?
	$num1 = "";
	$medio = "";
	$num3 = "";
	if(isset($_GET['creciente']) || isset($_GET['decreciente'])) {
		$n1 = $_GET["n1"];
		$n2 = $_GET["n2"];
		$n3 = $_GET["n3"];
		$menor=min($n1,$n2,$n3);
		$mayor=max($n1,$n2,$n3);
		$medio=($n1+$n2+$n3)-($mayor+$menor);
		if(isset($_GET['creciente'])) {
			$num1 = $menor;
			$num3 = $mayor;
		} else {
			$num1 = $mayor;
			$num3 = $menor;
		}
	}
	?>
	
	<form action="" method="get">
		<input type="text" name="n1" value="<?=$num1;?>">
		<input type="text" name="n2" value="<?=$medio;?>">
		<input type="text" name="n3" value="<?=$num3;?>">
		<br><br>
		<input type="submit" name="creciente" value="Creciente">
		<input type="submit" name="decreciente" value="Decreciente">
	</form>
	
</body>
</html>