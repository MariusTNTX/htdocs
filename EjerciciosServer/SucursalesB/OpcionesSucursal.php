<?
	include_once("./Sucursal.php");
	if(isset($_GET['madrid']) || isset($_GET['valencia']) || isset($_GET['barcelona'])){
		//Almacena las sucursales
		$sucursales = $_GET['sucursales'];
		//Almacena el nombre de la sucursal
		if(isset($_GET['madrid'])){
			$nombreSucursal = $_GET['madrid'];
		}else if(isset($_GET['valencia'])){
			$nombreSucursal = $_GET['valencia'];
		} else if(isset($_GET['barcelona'])){
			$nombreSucursal = $_GET['barcelona'];
		}
		//Imprime el formulario
?>
		<h1><?=$nombreSucursal?></h1>
		<form action="Compraventa.php" method="get">
			<input type="submit" name="opcion" value="Nueva Compra">
			<input type="submit" name="opcion" value="Nueva Venta">
			<input type="hidden" name="sucursal" value="<?=$nombreSucursal?>">
			<input type="hidden" name="sucursales" value="<?=$sucursales?>">
		</form>
		<form action="Menu.php" action="get">
			<input type="submit" name="retorno" value="Volver al Menú">
			<input type="hidden" name="sucursales" value="<?=$sucursales?>">
		</form>
<?	//Mensaje de error:
	} else {
		echo "<h1 style='color:red;text-align:center;font-weight:bold;'>Error: No se pudo encontrar la sucursal</h1>";
	}
?>