<?
  //Si se ha hecho clic en lista se redirige a lista.php
  //Si se ha hecho clic en descargar se redirige a listadopdf.php
  if(isset($_GET['lista'])) header('Location: listado.php');
  if(isset($_GET['descargar'])) header('Location: listadopdf.php');
  if(isset($_GET['pregunta'])) header('Location: crearencuesta.php');
?>
<h1>Administración</h1>
<form action="" method="get">
  <input type="submit" name="lista" value="Mostrar listado de resultados de las encuestas">
  <input type="submit" name="descargar" value="Descargar resultados en PDF">
  <input type="submit" name="pregunta" value="Crear encuesta">
</form>

<a href="index.php">Volver al index</a>