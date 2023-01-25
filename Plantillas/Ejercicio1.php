<?
	/*?><pre><?=print_r($_FILES)?></pre><?*/

	//Se incluyen las credenciales:
	include("C:/Apache24/includes/Credenciales.php");

	//Función que imprime el formulario: 
	function mostrarFormulario(){
		?><form action="" method="post" enctype="multipart/form-data">
			Texto: <input type="text" name="texto" value="<?=$valor?>"><br><br>
			Fotos: <input type="file" name="fotos[]" multiple><br><br>
			Comentarios:<br><textarea name="txtArea" rows="10" cols="40"></textarea><br><br>
			<input type="submit" name="enviar" value="Enviar">
			<input type="submit" name="mostrar" value="Mostrar">
		</form><?
	}

	if(!isset($_POST['imagen'])){ //POR DEFECTO: 
		
		mostrarFormulario();
		
		if(isset($_POST['enviar'])){ //BOTÓN ENVIAR:
			?><pre><?=print_r($_FILES)?></pre><?
		}

		else if(isset($_POST['mostrar'])){ //BOTÓN MOSTRAR: 
			
			echo "<table><tr><th>HEADER1</th><th>HEADER2</th><th>HEADER3</th></tr>";
			foreach($array as $i => $vlr){
				echo "<tr>";
				echo "<td><img width='100px' src='http://localhost/repaso/Ej25.php?imagen=".$img['min']['nombre']."'></td>";
				echo "<td><a href='___'>Enlace</a></td>";
				echo "</tr>";
			}
			echo "</table>";
			
			echo "<table>";
			echo "</table>";
			echo "<tr></tr>";
			echo "<th></th>";
			echo "<td></td>";
		}
		
	} else { //MODO VISOR: 
		
	}

	
?>

