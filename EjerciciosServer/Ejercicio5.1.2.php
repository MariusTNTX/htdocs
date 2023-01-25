<!--Versión A
Crear un formulario con 3 items numericos enteros (3 txtField) y un botón llamado Ordenar.
Al pulsar Ordenar ya no aparecerá el formulario, sino que apareceran los numeros
ordenados de menor a mayor (ej.: 3, 4, 7). -->

<html>
<body>
	<form action="" method="get" style="display: <?
		if(isset($_GET['ordenar'])){
			echo "none";
		}else{
			echo "block";
		}?>">
		<input type="text" name="n1">
		<input type="text" name="n2">
		<input type="text" name="n3">
		<br><br>
		<input type="submit" name="ordenar" value="Ordenar">
	</form>
	
	<?
	if(isset($_GET['ordenar'])){
		$n1 = $_GET["n1"];
		$n2 = $_GET["n2"];
		$n3 = $_GET["n3"];
		if($n1<=$n2){
			if($n2<=$n3){
				echo $n1.', '.$n2.', '.$n3;
			}elseif($n1<=$n3){
				echo $n1.', '.$n3.', '.$n2;
			}else{
				echo $n3.', '.$n1.', '.$n2;
			}
		} else{
			if($n1<=$n3){
				echo $n2.', '.$n1.', '.$n3;
			}elseif($n2<=$n3){
				echo $n2.', '.$n3.', '.$n1;
			}else{
				echo $n3.', '.$n2.', '.$n1;
			}
		}
	}
	
	/* ALTERNATIVA:
		$menor=min($n1,$n2,$n3);
		$mayor=max($n1,$n2,$n3);
		$medio=($n1+$n2+$n3)-($mayor-$menor);
		echo $menor.', '.$medio.', '.$mayor;
	*/
	?>
</body>
</html>