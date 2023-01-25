<?
	Header ("Content-type: image/png");

	$hi=imagecreate(300,300);
	
	//Establecemos color de fondo y definimos otro color
	$azul=imagecolorallocate($hi,0,0,255);
	$rojo=imagecolorallocate($hi,255,0,0);
	
	//Hacemos transparente el color de fondo
	imagecolortransparent($hi,$azul);
	
	//Dibujamos un rectangulo en rojo
	imagefilledrectangle($hi,99,99,299,299,$rojo);
	imagefilledrectangle($hi,125,120,299,299,$azul);

	//Enviamos la imagen
	imagepng($hi);
	// ... y la destruimos
	imagedestroy($hi);
?>