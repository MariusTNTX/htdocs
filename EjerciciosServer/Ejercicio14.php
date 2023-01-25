<!--EJERCICIO 14:

Crear una función llamada "flip_flop2" que nos va a intercambiar entre sí 
valores por índices de un array que pasemos como argumento. No se puede 
utilizar la función array_flip.-->

<?
	$array=['rojo','verde','azul','amarillo'];
	
	function flip_flop2($array){
		foreach($array as $i => $vlr){
			$flip["$vlr"]=$i;
		}
		return $flip;
	}
	
	$flip=flip_flop2($array);
?>

<html>
<body>
	<h1>Array original:</h1>
	<pre><?=print_r($array)?></pre>
	<h1>Array flip:</h1>
	<pre><?=print_r($flip)?></pre>
</body>
</html>