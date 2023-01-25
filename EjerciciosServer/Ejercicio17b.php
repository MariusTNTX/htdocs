<!--EJERCICIO 17:

Crear un cronómetro con dos botones: un botón start y un boton stop. Deberá 
inicar las horas, minutos y segundos y debajo los dos botones. El botón start 
marcará segundo a segundo el tiempo y el botón stop detiene la cuenta dejandola 
tal y como estaba al ser pulsado, y el botón start continuaría el tiempo por 
donde lo dejó. Se puede añadir un botón reset. -->

<?
	//Si se presiona Start:
	if(isset($_GET['start'])){
		//Se obtienen los segundos incrementados en 1
		$tiempo = strtotime($_GET['crono'])+1;
		//Se transforma a tiempo
		$tiempo = date("H:i:s",$tiempo);
		//Se refresca la página enviando el start y el tiempo
		header("refresh:1;url=Ejercicio17b.php?start=Start&crono=$tiempo");
		
	//Si se presiona Stop: Se imprime el tiempo del cronometro
	} else if(isset($_GET['stop'])) $tiempo = $_GET['crono'];
		
	//Si se presiona reset o ninguno: Se imprime el tiempo a cero
	else $tiempo = "00:00:00";
?>

<form action="" method="get">
	<input type="text" name="crono" value="<?=$tiempo?>" readonly><br><br>
	<input type="submit" name="start" value="Start">
	<input type="submit" name="stop" value="Stop"><br><br>
	<input type="submit" name="reset" value="Reset">
</form>