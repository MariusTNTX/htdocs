<?
  include("conexion.php");
  $r1 = $_GET['r1'];
  $r2 = $_GET['r2'];
  $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
  $rest = mysqli_query($c1,'select pregunta,correcta from preguntas');
  if($rest){
    $data = mysqli_fetch_all($rest,MYSQLI_ASSOC);
    $aciertos=0;
    if($r1==$data[0]['correcta']) $aciertos++;
    if($r2==$data[1]['correcta']) $aciertos++;
    $fallos = 2-$aciertos;
    $porcent = $aciertos/2*100;
    mysqli_query($c1,'insert into resultados values("'.$data[0]['pregunta'].'","'.$aciertos.'","'.$fallos.'")');
?>

<p>Total de preguntas: 2 - Aciertos: <?=$aciertos?> - Fallos: <?=$fallos?> - Porcentaje de aciertos: <?=$porcent?>%</p>
<hr>
<a href="encuesta.php">Volver a realizar la encuesta</a><br>
<a href="index.php">Volver al login</a>

<?
} else {
  echo "No existen preguntas creadas";
}
?>