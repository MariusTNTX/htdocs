<!-- EJERCICIO 7

Crear un formulario que permita introducir un numero cualquiera 
y tras pulsar enviar muestre en letra el resto de dividir ese 
numero entre 10. -->

<?
	if(isset($_GET['num'])){
		//Se almacena el número en una variable local
		$num = $_GET['txt'];
		
		//Se obtiene el resto
		$resto = intval($num)%10;
		
		//Se crea un array con todos los resultados posibles en formato escrito 
		$strings=array('Cero','Uno','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve');
		
		//Se obtiene del array la palabra correspondiente al resto obtenido y se introduce en la frase final
		echo 'El resto de dividir '.$num.' entre 10 es <b><i>'.$strings[$resto].'</i></b>';
	} else {
?>

<html>
<body>
	<form action="" method="get">
		<input type="text" name="txt">
		<input type="submit" name="num" value="Enviar">
	</form>
</body>
</html>

<?}?>