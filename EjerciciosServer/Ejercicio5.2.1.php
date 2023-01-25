<!--Versión B
Ordenamos varios los mismos ítems de texto y colocamos dos botones. Uno que nos permita 
ordenar en oden creciente y otro en decreciente. -->

<html>
<body>
	<?
	if(!isset($_GET['creciente']) && !isset($_GET['decreciente'])){
		echo 
		'<form action="" method="get">
			<input type="text" name="n1">
			<input type="text" name="n2">
			<input type="text" name="n3">
			<br><br>
			<input type="submit" name="creciente" value="Creciente">
			<input type="submit" name="decreciente" value="Decreciente">
		</form>';
	} elseif(isset($_GET['creciente'])) {
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
	} else {
		if($_GET['n1']>=$_GET['n2']){
			if($_GET['n2']>=$_GET['n3']){
				echo $_GET["n1"].', '.$_GET["n2"].', '.$_GET["n3"];
			}elseif($_GET['n1']>=$_GET['n3']){
				echo $_GET["n1"].', '.$_GET["n3"].', '.$_GET["n2"];
			}else{
				echo $_GET["n3"].', '.$_GET["n1"].', '.$_GET["n2"];
			}
		} else{
			if($_GET['n1']>=$_GET['n3']){
				echo $_GET["n2"].', '.$_GET["n1"].', '.$_GET["n3"];
			}elseif($_GET['n2']>=$_GET['n3']){
				echo $_GET["n2"].', '.$_GET["n3"].', '.$_GET["n1"];
			}else{
				echo $_GET["n3"].', '.$_GET["n2"].', '.$_GET["n1"];
			}
		}
	}
	?>
</body>
</html>