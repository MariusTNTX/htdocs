<?
	include_once("./Sucursal.php");
	echo "<html><head><style>";
	echo "table{width:400px; text-align:center;} th{background-color:gainsboro} th,td{border:1px solid black}";
	echo "</style></head><body>";
	echo "<h1>Informe del Día</h1><br>";
	
	//Almacena las sucursales
	$sucursales = unserialize(urldecode($_GET['sucursales']));
	
	//Recorre las sucursales creando la tabla
	echo "<h2>Movimientos Bancarios de las Sucursales:</h2>";
	echo "<table><tr><th>SUCURSAL</th><th>VENTAS</th><th>COMPRAS</th><th>TOTAL</th></tr>";
	foreach($sucursales as $i => $suc){
		echo '<tr><td>'.strtoupper($i).'</td><td>'.$suc->getVentas().' €</td><td>'.$suc->getCompras().' €</td><td>'.$suc->getTotal().' €</td></tr>';
	}
	echo "</table><br><br>";
	
	//Calcula el saldo de la empresa y lo imprime
	$ingresos = 0;
	foreach($sucursales as $suc) $ingresos+=$suc->getTotal();
	echo "<h2>Saldo Total de la Empresa: ".(5000+$ingresos)."€</h2><br>";
	
	//Imprime el botón de volver al menú
?>
	<form action="Menu.php" action="get">
		<input type="submit" name="retorno" value="Volver al Menú">
		<input type="hidden" name="sucursales" value="<?=urlencode(serialize($sucursales))?>">
	</form>
</body>
</html>