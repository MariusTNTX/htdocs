<?
  if (isset($_GET['op'])) $pantalla = $_GET['pantalla'].$_GET['op'];
  elseif (isset($_GET['limpiar'])) $pantalla = "";
  elseif (isset($_GET['igual'])){
    $pantalla = $_GET['pantalla'];
    eval("\$pantalla = $pantalla;"); // \$ = variable ||| $ = contenido
  }
  elseif (isset($_GET['borrar'])) $pantalla = substr($_GET['pantalla'], 0, -1);
?>

<html>
<body>
  <form action="" method="get">
    <input type="text" name="pantalla" value="<?=$pantalla?>"> <!-- ¿No hace falta inicializar $pantalla? -->
    <input type="submit" name="borrar" value="<=="><br><br>
	<input type="submit" name="op" value="1">
	<input type="submit" name="op" value="2">
	<input type="submit" name="op" value="3">
    <input type="submit" name="op" value="+"><br>
	<input type="submit" name="op" value="4">
	<input type="submit" name="op" value="5">
	<input type="submit" name="op" value="6">
    <input type="submit" name="op" value="-"><br>
	<input type="submit" name="op" value="7">
	<input type="submit" name="op" value="8">
	<input type="submit" name="op" value="9">
    <input type="submit" name="op" value="*"><br>
	<input type="submit" name="op" value="0">
	<input type="submit" name="igual" value="=">
	<input type="submit" name="limpiar" value="C">
    <input type="submit" name="op" value="/">
  </form>
</body>
</html>