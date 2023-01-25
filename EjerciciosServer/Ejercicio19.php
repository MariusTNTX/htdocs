<!--EJERCICIO 19:

Crear una función calendario que reciba como parámetros mes y año y represente 
el calendario correspondiente al mes y año recibido. Los domingos y las 
festividades deben aparecer en color rojo. Los datos se recogerán desde un 
formulario y la función estará alojada en un archivo independiente.-->

<?include_once "calendario2.php";?>

<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="Ejercicio19.css">
</head>
<body>
	<form>
		Mes: <input type="text" name="mes">
		Año: <input type="text" name="anio"><br><br>
		<input type="submit" name="back" value="Mes Anterior">
		<input type="submit" name="submit" value="Mostrar Calendario">
		<input type="submit" name="next" value="Mes Siguiente">
	</form>

	<?
		if(isset($_GET['submit'])){
			if(($_GET['mes'] >= 1 && $_GET['mes'] <= 12) &&
			   ($_GET['anio'] >= 1 && $_GET['anio'] <= 9999)){
				calendario($_GET['mes'],$_GET['anio']);
			} else {
				if($_GET['mes'] < 1 || $_GET['mes'] > 12){
					echo "<p style='color:red; font-weight:bold;'>¡El mes debe comprenderse entre 1 y 12!</p>";
				} 
				if($_GET['anio'] < 1 || $_GET['anio'] > 9999){
					echo "<p style='color:red; font-weight:bold;'>¡El año debe comprenderse entre 1 y 9999!</p>";
				}
			}
		}
		
		if(isset($_GET['back']) || isset($_GET['next'])){
			$mes = $_GET['mes'];
			$anio = $_GET['anio'];
			if(isset($_GET['back'])) $mes--;
			else if(isset($_GET['next'])) $mes++;
				if($mes>12){
					$mes=1;
					$anio++;
				} else if($mes<1){
					$mes=12;
					$anio--;
				}
			calendario($mes,$anio);
		}
		
	?>
</body>
</html>

