<?
//Redimensionado de imagenes
	
	Header("Content-type:image/png");
	
	//Averiguamos el tamaño de la imagen que vamos a importar
	$anchoalto=getimagesize("Edificio.jpg");
	//print_r($anchoalto);
	
	//Importamos la imagen
	$io=imagecreatefromjpeg("Edificio.jpg");

	//Creamos el "papel fotografico" para positivar la imagen importada
	$if=imagecreatetruecolor($anchoalto[0]*0.5,$anchoalto[1]*0.5);

	//Positivamos la imagen importada sobre el papel fotografico ...
	// ... utilizamos imagecopyresampled(papelfotografico,imagen,destino_x,destino_y,recorte_x,recorte_y,tamañofinal_imagen_ancho,tamañofinal_imagen_ alto,tamañorecorte_ancho,tamañorecorte_alto)
	imagecopyresampled($if,$io,0,0,100,100,$anchoalto[0]*0.5,$anchoalto[1]*0.5,$anchoalto[0],$anchoalto[1]);

	//Dibujamos la imagen
	imagepng($if);

	// ... y destruimos la imagen y el papel fotografico
	imagedestroy($io);
	imagedestroy($if); 
?>