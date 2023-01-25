<!--EJERCICIO 13:

Crear un script que represente mediante asteriscos el valor 
correspondiente a 5 cantidades numericas introducidas por teclado 
asignando a cada asterisco 10 unidades del valor introducido y 
mostrando la salida ordenada de mayor a menor cantidad. Al final 
de cada líena de astericos aparecerá el valor numérico en la misma 
columna para las 5 filas. (Ej.: 70 = 7 asteriscos, tabulación, 70). 
El número se redondea si no es divisible entre 10. printf(). -->

<?
if(isset($_GET['submit'])){
	//Se guarda el array de valores
	$numeros = $_GET['valor'];
	//Se ordena de mayor a menor
	rsort($numeros);
	/* Se calcula la longitud máxima por línea cogindo como 
	   referencia el número más elevado*/
	$long = $numeros[0]/10 + 2;
	
	foreach($numeros as $i => $vlr){
		//Cada numero se redondea a la decima y se divide entre 10
		$num = round($vlr,-1)/10;
		//Se imprimen los asteriscos
		for($j=0; $j<$num; $j++) echo '*';
		//Se imprimen los espacios restantes
		for($j=0; $j<($long-$num); $j++) echo '&nbsp;&nbsp;';
		//Se imprime el número original correspondiente
		echo $numeros[$i].'<br>';
	}
} else {
?>

<html>
<body>
	<form action="" method="get">
		Valor 1:<input type="text" name="valor[]"><br>
		Valor 2:<input type="text" name="valor[]"><br>
		Valor 3:<input type="text" name="valor[]"><br>
		Valor 4:<input type="text" name="valor[]"><br>
		Valor 5:<input type="text" name="valor[]"><br><br>
		<input type="submit" name="submit" value="Enviar">
	</form>
</body>
</html>

<?}?>