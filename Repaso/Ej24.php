<?
	function mostrarFormulario(){
		?><form action="" method="post" enctype="multipart/form-data">
			Nombre: <input type="text" name="nombre" value=""><br><br>
			Foto: <input type="file" name="foto"><br><br>
			Comentarios:<br><textarea name="comentarios"></textarea><br><br>
			<input type="submit" name="anadir" value="Añadir">
			<input type="submit" name="mostrar" value="Mostrar">
		</form><?
	}
	if(!$_GET['nombre']){ //MODO FORMULARIO
		mostrarFormulario();
		if(isset($_POST['anadir'])){
			$fic = fopen($_FILES['foto']['tmp_name'],'r');
			$data = fread($fic,$_FILES['foto']['size']);
			fclose($fic);
			$registro = [$_POST['nombre'],$data,$_POST['comentarios']];
			$fic=fopen('libro.csv','a');
			fputcsv($fic,$registro);
			fclose($fic);
		} else if(isset($_POST['mostrar'])){
			$fic = fopen('libro.csv','r');
			echo "<table><tr><th>Nombre</th><th>Imagen</th><th>Comentarios</th></tr>";
			while(!feof($fic)){
				$registro = fgetcsv($fic);
				if($registro[0]){
					echo "<tr>";
					echo '<td>'.$registro[0].'</td>';
					echo '<td><img width="100px" src="http://localhost/repaso/Ej24.php?nombre='.$registro[0].'"></td>';
					echo '<td>'.$registro[2].'</td>';
					echo "</tr>";
				}
			}
			fclose($fic);
			echo "</table>";
		}
	} else { //VISOR DE IMAGENES
		header('Content-Type: image/jpeg');
		$fic = fopen('libro.csv','r');
		do{
			$reg = fgetcsv($fic);
		} while($reg[0]!=$_GET['nombre']);
		echo $reg[1];
		fclose($fic);
	}
?>