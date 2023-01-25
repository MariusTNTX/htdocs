<?
	$fechaActual = new DateTime();
	$fechaNavidad = new DateTime('2023-01-01');
	$inter = $fechaActual->diff($fechaNavidad);
	echo $inter->format('%m meses y %d días.<br>Tiempo restante: %H:%i:%s');
	header('refresh:1;url=Ejx2.php');
?>
