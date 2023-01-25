<!--EJERCICIO 12:

Crear un formulario que pida nombre, edad y email. Los datos los 
recogerá el mismo documento mostrando el nombre, la edad y el email 
introducido y la frase "datos enviados correctamente" o "datos 
incorrectos, revise errores y reenvíe". Los posibles errores serán 
que la edad no sea un valor numérico o que el email no contenga una 
estructura correcta (no usar la función validadora de emails). En 
caso de que los datos sean incorrectos se muestren en el mismo 
formulario con un color diferente (rojo) para que se puedan modificar 
y se vuelva a validar el formulario. -->

<?
$nombre=$_GET['txtNombre'];
$edad=$_GET['txtEdad'];
$email=$_GET['txtEmail'];
$patron="/[\w]{1,}@(g|hot)mail\.(es|com)/";
$style="";

//Si los datos son correctos se imprime el output
if($nombre!="" && is_numeric($edad) && preg_match($patron,$email)){
	
	//Se imprime el mensaje de éxito
	echo '<p style="color: lime;"><b>DATOS ENVIADOS CORRECTAMENTE</b>:</p>';
	
	//Se imprimen los datos
	echo "<ul type='disc'><li>Nombre: <b>$nombre</b></li>";
	echo "<li>Edad: <b>$edad años</b></li>";
	echo "<li>Email: <b><a href='mailto:$email'>$email</a></b></li></ul>";
	
//Si los datos son incorrectos o no recibe datos se imprime el formulario
} else { 

	//Si se recibe un envío incorrecto se modifican los estilos correspondientes
	if(isset($_GET['submit'])){
		
		//Se imprime el mensaje de error
		echo '<p style="color: red;">¡Datos Incorrectos! Revise Errores y Reenvíe:</p>';
		
		//Se tratan los distintos errores de forma diferente
		if($nombre=="") $style.="input[name=txtNombre]{background-color: red;}";
		
		if($edad=="") $style.="input[name=txtEdad]{background-color: red;}";
		else if(!is_numeric($edad)) $style.="input[name=txtEdad]{color: red;}";
		
		if($email=="") $style.="input[name=txtEmail]{background-color: red;}";
		else if(!preg_match($patron,$email)) $style.="input[name=txtEmail]{color: red;}";
	}
?>

<html>
<head>
	<style>
		<?=$style?>
	</style>
</head>
<body>
	<form action="" method="get">
		Nombre:
		<input type="text" name="txtNombre" value=<?=$nombre?>><br>
		Edad:
		<input type="text" name="txtEdad" value=<?=$edad?>><br>
		Email:
		<input type="text" name="txtEmail" value=<?=$email?>><br><br>
		<input type="submit" name="submit" value="Enviar">
	</form>
</body>
</html>

<?}?>