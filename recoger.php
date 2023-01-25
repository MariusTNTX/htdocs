<?
	if(isset($_GET['botonL'])){
		echo "Has pulsado el botón Limpiar";
		
	} elseif(isset($_GET['botonA'])){
		echo "Has pulsado el botón Aceptar <br>";
		echo 'Contenido = '.$_GET['nombre'].' '.$_GET['apellido'];
	}
?>