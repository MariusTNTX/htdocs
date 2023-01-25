<?
	//FUNCIONES ---------------------------------
	
	//Devuelve un número dependiendo de las condiciones propuestas por el ejercicio:
	function validacion($array, $usuario, $correo){
		$us = false;
		$co = false;
		foreach($array as $vlr){
			if($vlr['usuario']==$usuario && $vlr['correo']==$correo) return 1;
			else if($vlr['usuario']==$usuario) $us = true;
			else if($vlr['correo']==$correo) $co = true;
		}
		if($us && $co) return 2;
		else if($co) return 3;
		return 4;
	}

	//Enviar mail al correo indicado con un html que conste de una url hacia validacion.php: 
	function enviarValidacion($usuario, $correo, $regis){
		$msj = "<html><head></head><body><a src='validacion.php?usuario=$usuario&correo=$correo&regis=$regis'>Enlace de Validacion</a></body></html>";
		mail($correo,"Validación",$msj,"From: molinamario.msc@gmail.es");
	}

	//EJERCICIO 2 -----------------------------------	

	//Se almacena regis unserializado de la url (si no existe se incializa como array vacío): 
	$regis = (isset($_GET['regis'])) ? unserialize(urldecode($_GET['regis'])) : [];

	//BOTÓN ENVIAR: 
	if(isset($_GET['enviar'])){
		//Según el código dado por validacion():
		switch(validacion($regis,$_GET['usuario'],$_GET['correo'])){
			case 1: echo "<h1>Usuario válido</h1>";
				break;
			case 2: echo "<h1>El usuario ya existe</h1>";
				break;
			case 3: echo "<h1>Ya hay un usuario con ese email</h1>";
				break;
			case 4: enviarValidacion($_GET['usuario'],$_GET['correo'],urlencode(serialize($regis)));
				break; 
			default: echo "<h1>Error al Validar</h1>";
		}

	//ACCESO A TRAVÉS DE VALIDACIÓN.PHP: 
	} else if(isset($_GET['valido'])){
		//Se añade el nuevo usuario con su contraseña:
		$regis[] = array('usuario'=>$_GET['usuario'],'correo'=>$_GET['correo']);
	}

	//Se serializa regis para introducirlo en el formulario:
	$regis = urlencode(serialize($regis));
?>

<form action="" method="get">
	Usuario: <input type="text" name="usuario" value=""><br><br>
	Correo: <input type="text" name="correo" value=""><br><br>
	<input type="submit" name="enviar" value="Enviar">
	<input type="hidden" name="regis" value="<?=$regis?>">
</form>