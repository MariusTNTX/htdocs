<!--EJERCICIO 15:

Crear una función a la que se le pase una cadena y un caracter y la función 
devolverá un booleano que una vez evaluado si el retorno es true mostrará 
la frase "el caracter X está en la cadena XXX y aparece X veces", y en caso 
de retornar false mostrará la frase "el caracter X no está en la cadena XXX". 
Serán recogidos mediante un formulario.-->

<?
	//$count=0;
	
	function contar($l, $txt){
		global $count;
		$count = substr_count($txt,$l,0,strlen($txt));
		return $count>0;
	}
	
	if(isset($_GET['submit']) && $_GET['txtFrase']!="" && strlen($_GET['txtLetra'])==1){
		$frase=$_GET['txtFrase'];
		$letra=$_GET['txtLetra'];
		if(contar($letra, $frase)){
			echo 'El caracter "'.$letra.'" está en la cadena "'.$frase.'" y aparece '.$count.' veces.';
		} else {
			echo 'El caracter "'.$letra.'" NO está en la cadena "'.$frase.'".';
		}
	} else {
?>

<html>
<body>
	<form action="" method="get">
		Frase: <input type="text" name="txtFrase"><br>
		Letra: <input type="text" name="txtLetra"><br>
		<input type="submit" name="submit" value="Enviar">
	</form>
</body>
</html>

<?}?>