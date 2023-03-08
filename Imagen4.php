<?
	header ("Content-type: image/png");
	$hi=imagecreate(300,150);
	
	//Establecemos color de fondo y otro color
	imagecolorallocate($hi,0,0,255);
	$blanco=imagecolorallocate($hi,255,255,255);
	
	//Escribimos una palabra en color blanco
	imagestring($hi,5,50,50,"Casa",$blanco);
	
	// ... y una letra en vertical
	imagecharup($hi,4,100,50,"A",$blanco);
	
	//Ahora escribiremos otra palabra con fuente Arial
	imageloadfont("C:/Apache24/htdocs/Ebrima.gdf"); //FuentesGD/
	imagestring($hi,3,100,75,"Perro",$blanco);
	
	//Y por último, escribiremos una palabra utilizando una fuente True Type
	imagettftext($hi,24,45,200,100,$blanco,"C:/Windows/fonts/CALIBRI.TTF","Gato"); //FuentesTT/
	//Con imagettfbbox() podemos calcular el rectangulo que ocuparia un determinado texto
	
	//Enviamos imagen
	imagepng($hi);
	// ... y la destruimos
	imagedestroy($hi);
?>
	