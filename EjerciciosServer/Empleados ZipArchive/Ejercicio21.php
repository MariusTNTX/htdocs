<?
	include_once("BBDD_Ej21.php");
	
	$BBDD = new BBDD();
	
	if(isset($_GET['guardar'])){
		$nombre = $_GET['nombre'];
		$fechaAlt = $_GET['fechaAlt'];
		switch($BBDD->empleadoValido($nombre,$fechaAlt)){
			case 1: 
				$BBDD->guardarEmpleado($nombre,$fechaAlt);
				$nombre="";
				$fechaAlt="";
				break;
			case 0: 
				$styleNom=' style="background-color:red"';
				$styleFec=' style="background-color:red"';
				break;
			case -1: 
				$styleNom=' style="background-color:red"';
				break;
			case -2: 
				$styleFec=' style="background-color:red"';
				break;
		}
	}
?>

<html>
<head>
	<style>
		h1,form,table{text-align:center}
		form{margin:0 auto;}
		table{
			 margin:0 auto;
			 width:800px;
			 
		}
		th,td{
			border: 1px solid black;
			height: 40px;
			border-radius: 10px;
		}
		th{background-color: gainsboro}
		input{
			height: 40px;
			font-weight: bold;
		}
	</style>
</head>
<body>
	<br><h1>FECHAS DE ALTA Y RENOVACIÓN DE LOS EMPLEADOS</h1><br>
	<form action="" method="get">
		<input type="text" name="nombre" value="<?=$nombre?>" placeholder="NOMBRE" <?=$styleNom?>>
		<input type="text" name="fechaAlt" value="<?=$fechaAlt?>" placeholder="FECHA DE ALTA" <?=$styleFec?>><br><br>
		<input type="submit" name="guardar" value="Añadir Empleado"><br><br>
		<input type="submit" name="mostrar" value="Mostrar Lista de Empleados">
		<input type="submit" name="convertir" value="Obtener Array PHP">
		<input type="hidden" name="nuevosEmpleados" value="<?=urlencode(serialize($BBDD->getNuevos()))?>">
	</form>
</body>
</html>

<?
	if(isset($_GET['mostrar'])){
		if($BBDD->hayGuardados() || $BBDD->hayNuevos()) $BBDD->mostrarEmpleados();
		else echo "<h2 style='color:red'>No hay empleados</h2>";
	}
	if(isset($_GET['convertir'])){
		if($BBDD->hayNuevos()) $BBDD->convertirArray();
		else echo "<h2 style='color:red'>No hay empleados añadidos en la sesión actual</h2>";
	}
?>