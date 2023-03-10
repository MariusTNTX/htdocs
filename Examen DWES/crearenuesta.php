<?
  if(isset($_GET['guardar'])){
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
    mysqli_query($c1,'delete from preguntas');
    if(mysqli_query($c1,'insert into preguntas values("'.$_GET['texto'].'","'.$_GET['ra'].'","'.$_GET['rb'].'","'.$_GET['rc'].'","'.$_GET['rd'].'","'.$_GET['solucion'].'")')){
      echo "Respuesta introducida";
    } else {
      echo "Error al introducir la pregunta";
    }
  }
?>

<form action="" method="get">
  Texto: <input type="text" name="texto" value=""><br>
  Respuesta a: <input type="text" name="ra" value=""><br>
  Respuesta b: <input type="text" name="rb" value=""><br>
  Respuesta c: <input type="text" name="rc" value=""><br>
  Respuesta d: <input type="text" name="rd" value=""><br>
  Solucion: <select name="solucion">
    <option value="a">a</option>
    <option value="b">b</option>
    <option value="c">c</option>
    <option value="d">d</option>
  </select><br><br>
  <input type="submit" name="guardar" value="Guardar">
</form>