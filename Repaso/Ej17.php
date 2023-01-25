<?
	function mostrarFormulario($tiempoScr, $tiempoIni){
		?><form action="" method="get">
			<input type="text" name="screen" value="<?=$tiempoScr?>"><br><br>
			<input type="submit" name="start" value="Start">
			<input type="submit" name="stop" value="Stop">
			<input type="submit" name="reset" value="Reset">
			<input type="hidden" name="tiempoIni" value="<?=$tiempoIni?>">
		</form><?
	}
	
	if(isset($_GET['start'])){
		$tiempo = strtotime($_GET['screen']);
		
		header("refresh: 1; url: Ej17.php?start=Start&screen=$tiempo");
	} else if(isset($_GET['stop'])){
		
	} else if(isset($_GET['reset'])){
		
	}
	
	mostrarFormulario($tiempoScr, $tiempoIni);
	
?>