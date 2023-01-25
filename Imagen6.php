<?php
//Copiado de una imagen sobre otra

	//Importamos las dos imagenes (la de fondo, y la que vamos a recortar
	$if = imagecreatefromjpeg("Edificio.jpg");
	$ir = imagecreatefromjpeg("Febrero2016.jpg");
	
	//Calculamos el tamaño original de la imagen que vamos a recortar
	$tamir=getimagesize("Febrero2016.jpg");
	//Colocamos la imagen recortada sobre la imagen de fondo
	imagecopy($if,$ir,100,100,100,100,$tamir[0]-100,$tamir[1]-100);

	//Enviamos la imagen
	header('Content-type: image/jpeg');
	imagejpeg($if);

	//Destruimos
	imagedestroy($if);
	imagedestroy($ir);
?> 