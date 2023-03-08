<?
	function mostrarFormulario(){?>
		<form enctype="multipart/form-data" action="" method="post" style="margin:0 auto; text-align:center; margin-top:20px;">
			<h1 style="margin-bottom:30px">Añadir Visitante:</h1>
			<b>Nombre</b>: <input type="text" name="nombre" style="margin-right:20px">
			<b>Foto</b>: <input type="file" name="foto"><br><br>
			<b>Comentarios</b>: <br><textarea cols="40" rows="8" name="comentarios"></textarea><br><br>
			<input type="submit" name="insertar" value="Insertar">
			<input type="submit" name="ver" value="Ver" style="margin-left:20px">
		</form>
	<?}
	
	function almacenarFoto(){
		$tempFile=$_FILES["foto"]["tmp_name"];
		$nameFile=$_FILES["foto"]["name"];
		$ruta="C:/Apache24/htdocs/EjerciciosServer/Ejercicio24/imagenes_obtenidas/".$nameFile;
		move_uploaded_file($tempFile, $ruta);
		return $nameFile;
	}
	
	function insertarRegistro($n,$f,$c){
		$fic = fopen("Visitas.csv","a");
		$reg=[$n,$f,$c];
		$res=fputcsv($fic,$reg,";");
		fclose($fic);
		if(is_integer($res)) return "<h2 style='color:green;margin-top:50px;text-align:center;'>Visitante introducido con éxito</h2>";
		else return "<h2 style='color:red;margin-top:50px;text-align:center;'>Hubo un error al introducir al visitante</h2>";
	}
	
	function mostrarListado(){
		if(file_exists("Visitas.csv")){
			$styleTH=" style='border:1px solid black; height:40px; font-size:20px;'";
			$styleTD=" style='border:1px solid black'";
			echo "<h1 style='text-align:center; margin-top:30px;'>Listado de Visitantes</h1>";
			echo '<form action="visor.php" target="_blank" method="post" style="margin:0 auto; width:600px; margin-top:20px;">';
			echo "<table style='border-collapse:collapse; width:100%; text-align:center'>";
			echo "<tr><th".$styleTH.">NOMBRE</th><th".$styleTH.">FOTO</th><th".$styleTH.">COMENTARIOS</th></tr>";
			$fic = fopen("Visitas.csv","r");
			while(!feof($fic)){
				$reg = fgetcsv($fic,1000,";");
				if(is_bool($reg)) continue;
				echo "<tr><td".$styleTD.">".$reg[0]."</td>";
				echo '<td'.$styleTD.'><input type="submit" name="'.$reg[1].'" value="Ver Foto"></td>';
				echo "<td".$styleTD.">".$reg[2]."</td></tr>";
			}
			fclose($fic);
			echo '</table></form><form action="ejercicio24.php" method="post" style="text-align:center; margin-top:30px;">';
			echo '<input type="submit" name="volver" value="Volver"></form>';
		} else {
			mostrarFormulario();
			echo "<h2 style='color:red;margin-top:50px;text-align:center;'>No hay ningún visitante registrado</h2>";
		}
	}
?>