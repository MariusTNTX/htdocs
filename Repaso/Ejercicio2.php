<?
	function mostrarFormulario(){
		?><form action="" method="post" enctype="multipart/form-data">
			<h1>Ejercicio 2:</h1>
			<input type="file" name="archivo"><br><br>
			<input type="submit" name="subir" value="Subir">
			<input type="submit" name="mostrar" value="Mostrar">
		</form><br><br><?
	}
	
	//POR DEFECTO Y BOTÓN SUBIR
	if(!isset($_POST['mostrar'])){
		mostrarFormulario();
		//BOTÓN SUBIR:
		if(isset($_POST['subir'])){
			if($_FILES['archivo']['name']!=""){
				if(strpos($_FILES['archivo']['type'],'/jp')){
					if(substr_count($_SERVER['HTTP_ACCEPT_ENCODING'],'gzip')>0){
						$fic = fopen($_FILES['archivo']['tmp_name'],'r');
						$data = fread($fic,$_FILES['archivo']['size']);
						fclose($fic);
						$data = gzencode($data);
						$fic = gzopen('imagen.jpeg','w');
						gzwrite($fic,$data);
						gzclose($fic);
					} else {
						move_uploaded_file($_FILES['archivo']['tmp_name'],'./imagen.jpeg');
					}
				} else echo "<h3>¡La imagen no es jpg ni jpeg!</h3>";
			} else echo "<h3>¡No se ha seleccionado ninguna imagen!</h3>";
		}
	
	//BOTÓN MOSTRAR: 
	} else {
		header('Content-Type: image/jpeg');
		header('Content-Encoding: gzip'); 
		readgzfile('imagen.jpeg');
	}
?>