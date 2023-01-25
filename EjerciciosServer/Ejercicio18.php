<!--EJERCICIO 18:

Mostrar mediante una cuenta atrás con horas, minutos y segundos el tiempo que 
falta hasta el final de la jornada lectiva (14:30). También se mostrará 
constantemente. -->

<?
	$sFin = mktime(14, 30, 0, 10, 22, 2022);
	$sRes = $sFin - time()-3600; //¿Por qué no lo hace bien?
	$tiempo = date("H:i:s",$sRes);
	header("refresh:1;url=Ejercicio18.php");
?>

<h1>Tiempo restante para las 14:30:</h1>
<h2 style="color:red;"><?=$tiempo?></h2>
<br>
<h3>(<?='Hora Actual: '.date("H:i:s",time());?>)</h3>
<h3>(<?='Hora Fin: '.date("H:i:s",$sFin);?>)</h3>
