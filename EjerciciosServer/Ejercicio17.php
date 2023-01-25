<!--EJERCICIO 17:

Crear un cronómetro con dos botones: un botón start y un boton stop. Deberá 
inicar las horas, minutos y segundos y debajo los dos botones. El botón start 
marcará segundo a segundo el tiempo y el botón stop detiene la cuenta dejandola 
tal y como estaba al ser pulsado, y el botón start continuaría el tiempo por 
donde lo dejó. Se puede añadir un botón reset. -->

<?
	//Si se presiona Start
	if(isset($_GET['start'])){
		//Se obtienen los valores por separado
		$tiempo = explode(":",$_GET['crono']);
		//Se incrementan los segundos
		$tiempo[2]++;
		//Se valida el tiempo
		if($tiempo[2]>=60){
			$tiempo[1]++;
			$tiempo[2]=0;
		} 
		if($tiempo[1]>=60){
			$tiempo[0]++;
			$tiempo[1]=0;
		}
		//Se transforma a tiempo
		$tiempo = implode(":",$tiempo);
		
		//Se refresca cada segundo enviando el start y los segundos
		header("refresh:1;url=Ejercicio17.php?start=Start&crono=$tiempo");
		
	//Si se presiona Stop
	} else if(isset($_GET['stop'])){
		//Se imprime el tiempo
		$tiempo = $_GET['crono'];
		
	//Si se presiona reset
	} else {
		//Se imprime el tiempo a cero
		$tiempo = "0:0:0";
	}
?>

<form action="" method="get">
	<input type="text" name="crono" value="<?=$tiempo?>" readonly><br><br>
	<input type="submit" name="start" value="Start">
	<input type="submit" name="stop" value="Stop"><br><br>
	<input type="submit" name="reset" value="Reset">
</form>