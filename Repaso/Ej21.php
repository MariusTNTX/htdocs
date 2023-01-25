<?
	function mostrarFormulario($empleados){
		?><form action="" method="get">
			<input type="text" name="nombre" placeholder="Nombre">
			<input type="text" name="fechaAlta" placeholder="Fecha de Alta"><br><br>
			<input type="submit" name="guardar" value="Guardar">
			<input type="submit" name="mostrar" value="Mostrar">
			<input type="hidden" name="empleados" value="<?=$empleados?>">
		</form><?
	}
	
	//Deserializar empleados si los hay
	$empleados = (isset($_GET['empleados'])) ? unserialize(urldecode($_GET['empleados'])) : []; 
	
	//Si boton Guardar
	if($_GET['guardar']){
		//Verificar formato de fecha correcto
		$fec = explode('-',$_GET['fechaAlta']);
		if(checkdate($fec[1],$fec[0],$fec[2])){
			//Calcular fecha 6 meses después 
			$fecha = date_create_from_format('d-m-Y',$_GET['fechaAlta']);
			$fecha->modify('+6 months');
			//Si no es lunes calcular su siguiente lunes
			if($fecha->format('D')!='Mon') $fecha->modify('next monday');
			//Añadir al array
			array_push($empleados,[$_GET['nombre'],$_GET['fechaAlta'],$fecha->format('d-m-Y')]);
		} else echo "<h2 style='color:red'>Formato de fecha incorrecto</h2>"; //Mensaje de error de formato
	}
	
	//Mostrar formulario (Serializar empleados)
	mostrarFormulario(urlencode(serialize($empleados)));
	
	//Si Boton Mostrar: Recorrer array e imprimir tabla
	if($_GET['mostrar']){
		echo "<table><tr><th>Nombre</th><th>Fecha Alta</th><th>Fecha Renovación</th></tr>";
		foreach($empleados as $emp){
			echo "<tr>";
			foreach($emp as $vlr){
				echo "<td>".$vlr."</td>";
			}
			echo "</tr>";
		}
		echo "</table>";
	}
?>