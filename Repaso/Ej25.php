<?
	include("C:/Apache24/includes/Credenciales.php");
	function mostrarFormulario(){
		?><form action="" method="post" enctype="multipart/form-data">
			<input type="file" name="fotos[]" multiple><br><br>
			<input type="submit" name="enviar" value="Enviar">
		</form><?
	}
	
	if(!isset($_GET['imagen'])){
		
		mostrarFormulario();
		
		if(isset($_POST['enviar'])){
			
			$ftp = ftp_connect("localhost");
			ftp_login($ftp,$usuario,$password);
			for($i=0; $i<4; $i++){
				//ftp_put($ftp,"/Mario/".$_FILES['fotos']['name'][$i],$_FILES['fotos']['tmp_name'][$i]);
			}
			ftp_close($ftp);
			
			$img['min']['size'] = min($_FILES['fotos']['size']);
			$pos = array_search($img['min']['size'],$_FILES['fotos']['size']);
			$img['min']['nombre'] = $_FILES['fotos']['name'][$pos];
			$img['max']['size'] = max($_FILES['fotos']['size']);
			$pos = array_search($img['max']['size'],$_FILES['fotos']['size']);
			$img['max']['nombre'] = $_FILES['fotos']['name'][$pos];
			
			echo "<table><tr><th></th><th>Imagen Pequeña</th><th>Imagen Grande</th></tr>";
			echo "<tr><td>Imagen</td><td><img width='100px' src='http://localhost/repaso/Ej25.php?imagen=".$img['min']['nombre']."'></td>";
			echo "<td><img width='100px' src='http://localhost/repaso/Ej25.php?imagen=".$img['max']['nombre']."'></td></tr>";
			echo "<tr><td>Tamaño</td><td>".$img['min']['size']."</td><td>".$img['max']['size']."</td></tr>";
			echo "</table>";
		}
	} else { //VISOR
		header('Content-Type: image/jpeg');
		$ftp = ftp_connect("localhost");
		ftp_login($ftp,$usuario,$password);
		ftp_get($ftp,'./'.$_GET['imagen'],'/Mario/'.$_GET['imagen']);
		ftp_close($ftp);
		readfile($_GET['imagen']);
		unlink($_GET['imagen']);
	}
?>