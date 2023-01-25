<?
	//Si se retorna al menú se recuperan las sucursales modificadas
	if(isset($_GET['sucursales'])){
		$sucursales = unserialize(urldecode($_GET['sucursales']));
	} else { //Sino se crean
		include_once("./Sucursal.php");
		$sucursales = array('madrid'=>new Sucursal(),'valencia'=>new Sucursal(),'barcelona'=>new Sucursal());
	}
?>

<h1>MENÚ PRINCIPAL</h1>
<form action="OpcionesSucursal.php" method="get">
	<input type="submit" name="madrid" value="Sucursal Madrid"><br>
	<input type="submit" name="valencia" value="Sucursal Valencia"><br>
	<input type="submit" name="barcelona" value="Sucursal Barcelona"><br>
	<input type="hidden" name="sucursales" value="<?=urlencode(serialize($sucursales))?>">
</form>

<form action="Cierre.php" method="get">
	<input type="submit" name="cierre" value="Cierre">
	<input type="hidden" name="sucursales" value="<?=urlencode(serialize($sucursales))?>">
</form>