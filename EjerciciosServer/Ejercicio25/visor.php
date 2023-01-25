<?
	$array = array_flip($_POST);
	$archivo = unserialize(urldecode($array['Ver'])); 
	header('Content-Type: '.$archivo['type']);
	echo file_get_contents("./archivos/".str_replace("_",".",$archivo['name']));
?>