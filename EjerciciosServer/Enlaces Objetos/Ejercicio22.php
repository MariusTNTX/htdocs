<?
	include_once("Menu_Ej22.php");
	
	$menu = new Menu();
	
	if(isset($_GET['guardar'])){
		$enlace = $_GET['enlace'];
		if($menu->enlaceValido($enlace)){
				$menu->guardarEnlace($enlace);
				$enlace="";
		} else $style=' style="background-color:red"';
	}
?>

<html>
<head>
	<style>
		*{text-align:center}
		form{margin:0 auto}
		input{
			height: 40px;
			font-weight: bold;
		}
		.horiz{
			display:inline-block; 
			width:max-content;
			margin: 0 10px;
			font-size: 20px;
		}
		.vertic{font-size: 20px;}
	</style>
</head>
<body>
	<br><h1>ENLACES</h1><br>
	<form action="" method="get">
		<input type="text" name="enlace" value="<?=$enlace?>" placeholder="ENLACE" <?=$style?>>
		<input type="submit" name="guardar" value="Añadir Enlace"><br><br>
		<input type="submit" name="mostrar" value="Mostrar en Vertical">
		<input type="submit" name="mostrar" value="Mostrar en Horizontal"><br><br>
		<input type="submit" name="convertir" value="Obtener Array PHP">
		<input type="hidden" name="nuevosEnlaces" value="<?=urlencode(serialize($menu->getNuevos()))?>">
	</form>

<?
	if(isset($_GET['mostrar'])){
		if($menu->hayGuardados() || $menu->hayNuevos()) $menu->mostrar($_GET['mostrar']);
		else echo "<h2 style='color:red'>No hay enlaces</h2>";
	}
	if(isset($_GET['convertir'])){
		if($menu->hayNuevos()) $menu->convertirArray();
		else echo "<h2 style='color:red'>No hay enlaces añadidos en la sesión actual</h2>";
	}
?>

</body>
</html>