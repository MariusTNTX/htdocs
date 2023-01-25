<?
	include_once("./funciones.php");
	include_once("C:/Apache24/includes/credenciales.php");
	
	$ruta = (isset($_GET['ruta'])) ? $_GET['ruta'] : "/Mario";
	while(strpos($ruta,'%2F')) str_replace('%2F','/',$ruta);
	
	$checked = (isset($_GET['check'])) ? $_GET['check'] : "";
	
	
	if(isset($_GET['volver'])) $ruta = volver($ruta);
	
	if(isset($_GET['borrar']) && is_array($checked)) borrar($ruta,$checked,$usuario,$password);
	
	mostrarArchivos($ruta,$usuario,$password);
?>