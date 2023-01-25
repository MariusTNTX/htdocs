<!--Versión A
Crear un formulario con 3 items numericos enteros (3 txtField) y un botón llamado Ordenar.
Al pulsar Ordenar ya no aparecerá el formulario, sino que apareceran los numeros
ordenados de menor a mayor (ej.: 3, 4, 7). -->

<html>
<body>
	<?
	if(!isset($_GET['ordenar'])){
		echo 
		'<form action="" method="get">
			<input type="text" name="n1">
			<input type="text" name="n2">
			<input type="text" name="n3">
			<br><br>
			<input type="submit" name="ordenar" value="Ordenar">
		</form>';
	} else {
		if($_GET['n1']<=$_GET['n2']){
			if($_GET['n2']<=$_GET['n3']){
				echo $_GET["n1"].', '.$_GET["n2"].', '.$_GET["n3"];
			}elseif($_GET['n1']<=$_GET['n3']){
				echo $_GET["n1"].', '.$_GET["n3"].', '.$_GET["n2"];
			}else{
				echo $_GET["n3"].', '.$_GET["n1"].', '.$_GET["n2"];
			}
		} else{
			if($_GET['n1']<=$_GET['n3']){
				echo $_GET["n2"].', '.$_GET["n1"].', '.$_GET["n3"];
			}elseif($_GET['n2']<=$_GET['n3']){
				echo $_GET["n2"].', '.$_GET["n3"].', '.$_GET["n1"];
			}else{
				echo $_GET["n3"].', '.$_GET["n2"].', '.$_GET["n1"];
			}
		}
	}
	?>
</body>
</html>