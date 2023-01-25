<?
	include_once("funciones.php");

	if(!isset($_POST['ver'])){
		if(count($_FILES)>0) $foto = almacenarFoto();
		mostrarFormulario();
		if(isset($_POST['insertar'])){
			$nombre=(isset($_POST['nombre']))?$_POST['nombre']:"";
			$comentarios=(isset($_POST['comentarios']))?$_POST['comentarios']:"";
			$msj=insertarRegistro($nombre,$foto,$comentarios);
			echo $msj;
		} 
	} else mostrarListado();
?>