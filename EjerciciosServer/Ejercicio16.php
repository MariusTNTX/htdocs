<!--EJERCICIO 16: 

Crear una función que divida el valor correspondiente al índice más pequeño 
de un array escalar entre el valor correspondiente con el indice más grande, 
independientemente del orden en el que se hayan metido los elementos en el 
array. Debe dividilos y eliminar ambos elementos del array, reptiendo la 
operación hasta que en el array quede 1 o 0 elementos. Se mostrará por 
pantalla la secuencia de los resultados de las divisiones y un mensaje final 
cuando haya finalizado ("Proceso finalizado"). El array será inventado de 
6-7 elementos desordenados. por ejemplo: 7=>4, 4=>6, 2=>8, 6=>9, 5=>1, 
0=>3.-->

<?
	function nuevoArray(){
		$elementos=rand(2,20);
		for($i=0; $i<$elementos; $i++){
			$array[rand(1,50)]=rand(1,50);
		}
		return $array;
	}
	
	function dividir(&$array){
		static $count;
		$count++;
		$vlr1=array_shift($array);
		$vlr2=array_pop($array);
		$res=$vlr1/$vlr2;
		return "<b><u>Operación $count</u></b>: $vlr1 / $vlr2 = $res<br><br>";
	}
	
	//$array = array(7=>4, 4=>6, 2=>8, 6=>9, 5=>1, 0=>3, 1=>7);
	$array = nuevoArray();
?>

<h1>Array Original:</h1>
<h3><?='Número de elementos: '.count($array)?></h3>
<pre><?=print_r($array)?></pre>

<h1>Operaciones:</h1>
<?
	ksort($array);
	while(count($array)>1) echo dividir($array);
?>