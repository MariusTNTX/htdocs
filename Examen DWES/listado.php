<?
  include("conexion.php");
  $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
  $rest = mysqli_query($c1,'select * from resultados');
  if($rest){
    $data = mysqli_fetch_all($rest,MYSQLI_ASSOC);
    echo "<table><tr><td>Pregunta</td><td>Aciertos</td><td>Fallos</td></tr>";
    foreach($data as $d){
      echo "<tr>";
      foreach($d as $info){
        echo "<td>".$info."</td>";
      }
      echo "</tr>";
    }
    echo "</table>";
?>

<?
} else {
  echo "No existen resultados almacenados";
}
?>

<a href="administracion.php">Volver</a>