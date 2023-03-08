<?/*
	?><pre><?=print_r()?></pre><?
*/
	include_once("funciones.php");
	include_once("C:/Apache24/includes/credenciales.php");

	$archivos=[];
	if(!isset($_POST['enviar'])) mostrarFormulario();
	else if(count($_FILES)>0){
		for($i=0; $i<4; $i++){
			$archivos[$i]["name"]=$_FILES["fotos"]["name"][$i];
			$archivos[$i]["type"]=$_FILES["fotos"]["type"][$i];
			$archivos[$i]["tmp_name"]=$_FILES["fotos"]["tmp_name"][$i];
			$archivos[$i]["error"]=$_FILES["fotos"]["error"][$i];
			$archivos[$i]["size"]=$_FILES["fotos"]["size"][$i];
			almacenarArchivo($archivos[$i],$usuario,$password);
		}
		seleccionarArchivos($archivos);
		recuperarArchivos($archivos,$usuario,$password);
		mostrarArchivos($archivos);
	}
?>