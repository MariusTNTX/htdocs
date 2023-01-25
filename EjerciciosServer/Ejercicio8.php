<!-- EJERCICIO 8:

Crear un formulario que recoga 3 valores (num o string) y que 
tras pulsar el boton enviar muestre los valores introducidos 
sin utilizar ni $request-get-post.  -->

<?
	/*if(isset($_GET['submit'])){
		//Se obtiene un array con los valores
		$variables=explode('&',$_SERVER['QUERY_STRING']);
		//Se elimina el ultimo valor (submit)
		array_pop($variables);
		//Se aisla el valor de su clave y se introduce en una frase
		foreach($variables as $i => $vlr){
			$variables[$i] = 'El valor '.($i+1).' es <b><i>'.substr($vlr,7).'</i></b>';
		}
		//Se transforma el array en un string con la lista de frases
		$variables = implode('<br>',$variables);
	}*/
	
	
	if($_SERVER['QUERY_STRING']!=""){
		
		//Se rellena un array con los valores de la URL
		parse_str($_SERVER['QUERY_STRING'],$variables);
		
		//Se elimina el ultimo valor (submit)
		array_pop($variables);
		
		$count=1; //-> Contador de vueltas del bucle
		
		//Se introduce cada valor en una frase y se imprime
		foreach($variables as $vlr){
			echo ' - El valor '.$count.' es <b><i>'.$vlr.'</i></b><br>';
			$count++;
		}
	} else {
?>

<html>
<body>
	<form action="" method="get">
		<input type="text" name="valor1">
		<input type="text" name="valor2">
		<input type="text" name="valor3"><br>
		<input type="submit" name="submit" value="Enviar">
	</form>
</body>
</html>

<?}?>