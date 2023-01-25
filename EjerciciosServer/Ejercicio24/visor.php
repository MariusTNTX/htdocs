<?
	header('Content-Type: image/jpg');
	$foto = array_flip($_POST);
	echo file_get_contents("./imagenes_obtenidas/".str_replace("_",".",$foto["Ver Foto"]));
?>