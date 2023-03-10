<?
  if(isset($_GET['volver'])) header("Location: index.php");
  if(isset($_GET['evaluar'])) header("Location: evaluar.php?".$_SERVER['QUERY_STRING']);
  include("conexion.php");
  $usuario = $_GET['usuario'];
  try {
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
    $rest = mysqli_query($c1,'select * from preguntas');
    if($rest){
      $data = mysqli_fetch_all($rest,MYSQLI_ASSOC);
?>

<h1>REALIZAR LA ENCUESTA: Seleccione una de las 4 respuestas posibles</h1>
<hr>
<p>Solo una respuesta es correcta. Al finalizar la encuesta se le informará el grado de aciertos que tuvo. La encuesta consta de 2 preguntas.</p>
<form action="evaluar.php" method="get">
  
  <p>1 <?=$data[0]['pregunta']?></p>
  <input type="radio" name="r1" value="a" require>a      <span class="margin-left: 10px"><?=$data[0]['r1']?></span><br>
  <input type="radio" name="r1" value="b">b      <span class="margin-left: 10px"><?=$data[0]['r2']?></span><br>
  <input type="radio" name="r1" value="c">c      <span class="margin-left: 10px"><?=$data[0]['r3']?></span><br>
  <input type="radio" name="r1" value="d">d      <span class="margin-left: 10px"><?=$data[0]['r4']?></span><br>

  <p>2 <?=$data[1]['pregunta']?></p>
  <input type="radio" name="r2" value="a" require>a      <span class="margin-left: 10px"><?=$data[1]['r1']?></span><br>
  <input type="radio" name="r2" value="b">b      <span class="margin-left: 10px"><?=$data[1]['r2']?></span><br>
  <input type="radio" name="r2" value="c">c      <span class="margin-left: 10px"><?=$data[1]['r3']?></span><br>
  <input type="radio" name="r2" value="d">d      <span class="margin-left: 10px"><?=$data[1]['r4']?></span><br><br>

  <input type="submit" name="evaluar" value="Evaluar"><br>
  <input type="submit" name="volver" value="Volver al Login"><br><br>
</form>

<?
} else {
  //Error
  echo "Aún no se ha creado ninguna encuesta";
}

} catch (Exception $e) {
  echo "<h2 style='color:red'>Error al verificar las preguntas, contacte con el administrador</h2>";
}
?>