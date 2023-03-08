<?
//Rotacion de imagenes
	
	//Importamos la imagen que vamos a rotar
	$i1=imagecreatefromjpeg("Febrero2016.jpg");
	
	//Establecemos el fondo azul ... transparente
	$azul=imagecolorallocate($i1,0,0,255);
	
	//Rotamos 45ª estableciendo en azul el color de la zona que queda descubierta
	$rotada=imagerotate($i1,45,$azul);
	
	//Enviamos la imagen
	Header("Content-type: image/png");
	imagepng($rotada);
	
	// ... y las destruimos
	imagedestroy($i1);
	imagedestroy($rotada);
?>