<?
	function mostrarFormulario(){
		?><form action="" method="get">
			<input type="text" name="v1" value="">
			<input type="text" name="v2" value="">
			<input type="text" name="v3" value=""><br><br>
			<input type="submit" name="mostrar" value="Mostrar">
		</form><?
	}
	
	parse_str($_SERVER['QUERY_STRING'],$variables);
	array_pop($variables);
	
	if($variables){
		echo "<h2>Lista de Variables:</h2><ol type='I'>";
		foreach($variables as $i => $vlr){
			echo "<li><b>$i</b>: $vlr</li>";
		}
		echo "</ol>";
	} else {
		mostrarFormulario();
	}
?>