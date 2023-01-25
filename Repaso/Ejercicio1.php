<?

	$txtArea = $_GET['txtArea'];
	
	if(!isset($_GET['descargar'])){
		
		//BOTÓN JUSTIFICAR:
		if(isset($_GET['justificar'])){
			$txtArea = wordwrap($txtArea, 20); 
		}

		//BOTÓN LIMPIAR: 
		else if(isset($_GET['limpiar'])){
			$txtArea = "";
		}
?>

<form action="" method="get">
	<h1>Ejercicio 1:</h1>
	<input type="submit" name="justificar" value="Justificar">
	<input type="submit" name="limpiar" value="Limpiar">
	<input type="submit" name="descargar" value="Descargar"><br>
	<textarea cols='40' rows='10' name="txtArea"><?=$txtArea?></textarea>
</form>

<?
	//BOTÓN DESCARGAR: 
	} else {
		header('Content-Disposition: attachment; filename=Texto.txt');
		echo $txtArea;
	}
?>