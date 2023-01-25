<?
	include_once("./Sucursal.php");
	if(isset($_GET['opcion'])){
		//Almacena las sucursales
		$sucursales = $_GET['sucursales'];
		
		//Almacena el nombre de la sucursal
		$nombreSucursal = $_GET['sucursal'];
		
		//Se almacena la ciudad de la sucursal
		if(strpos($nombreSucursal,'Madrid')){
			$ciudad='madrid';
		} else if(strpos($nombreSucursal,'Valencia')){
			$ciudad='valencia';
		} else if(strpos($nombreSucursal,'Barcelona')){
			$ciudad='barcelona';
		} else $ciudad='error';
		
		//Almacena la opción seleccionada
		$opcion=$_GET['opcion'];
		
		//SI HAY UN IMPORTE SE VALIDA Y SE MUESTRA EL RESULTADO
		if(isset($_GET['enviar']) && isset($_GET['importe'])){
			$importe = $_GET['importe'];
			$arraySucur = unserialize(urldecode($sucursales));
			$ciudad = $_GET['sucursal'];
			//Si es una cantidad
			if(is_numeric($importe)){
				//Hacer compra/venta
				if($opcion=='Nueva Compra'){ 
					$arraySucur[$ciudad]->comprar($importe);
					echo "<h1>Compra Exitosa de ".$importe."€</h1>";
				}
				else{ 
					$arraySucur[$ciudad]->vender($importe);
					echo "<h1>Venta Exitosa de ".$importe."€</h1>";
				}
				$sucursales = urlencode(serialize($arraySucur));
				?>
				<!--Volver al Menú-->
				<form action="Menu.php" action="get">
					<input type="submit" name="retorno" value="Volver al Menú">
					<input type="hidden" name="sucursales" value="<?=$sucursales?>">
				</form>
				<?
			//Si no es una cantidad
			} else echo "<h1 style='color:red;text-align:center;font-weight:bold;'>Error: El importe no es numérico</h1>";
		} else {
		//Imprime el formulario
?>
		<h1><?=$nombreSucursal?></h1>
		<h2><?=$opcion?></h2>
		
		<!--Importe-->
		<form action="" method="get">
			<input type="text" name="importe" value="<?=$importe?>">
			<input type="submit" name="enviar" value="Introducir">
			<input type="hidden" name="sucursales" value="<?=$sucursales?>">
			<input type="hidden" name="sucursal" value="<?=$ciudad?>">
			<input type="hidden" name="opcion" value="<?=$opcion?>">
		</form>
		<!--Atrás-->
		<form action="OpcionesSucursal.php" action="get">
			<input type="submit" name="retorno" value="Atrás">
			<input type="hidden" name="sucursales" value="<?=$sucursales?>">
			<input type="hidden" name="<?=$ciudad?>" value="<?=$nombreSucursal?>">
		</form>
		<!--Volver al Menú-->
		<form action="Menu.php" action="get">
			<input type="submit" name="retorno" value="Volver al Menú">
			<input type="hidden" name="sucursales" value="<?=$sucursales?>">
		</form>
		
<?	//Mensaje de error:
		}
	} else {
		echo "<h1 style='color:red;text-align:center;font-weight:bold;'>Error: No se pudo encontrar la opción</h1>";
	}
?>