<?php
//Crear imagenes antialias(ed)

	//Creamos dos imagenes
	$aa = imagecreatetruecolor(400, 100);
	$normal = imagecreatetruecolor(200, 100);

	//Activamos antialias para la imagen grande
	imageantialias($aa, true);
	
	//Asignar colores
	$rojo = imagecolorallocate($normal, 255, 0, 0);
	$rojo_aa = imagecolorallocate($aa, 255, 0, 0);

	//Dibujar dos líneas, una sobre cada imagen
	imageline($normal, 0, 0, 200, 100, $rojo);
	imageline($aa, 0, 0, 200, 100, $rojo_aa);

	//Fusionamos las dos imágenes, una al lado de la otra para dibujarlas (aa: izquierda, normal: derecha)
	imagecopymerge($aa, $normal, 200, 0, 0, 0, 200, 100, 100);

	//Dibujamos la imagen fusionada
	header('Content-type: image/png');
	imagepng($aa);
	
	// ... y las destruimos
	imagedestroy($aa);
	imagedestroy($normal);
?> 