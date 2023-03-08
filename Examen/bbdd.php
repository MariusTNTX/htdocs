<?
  $c1 = mysqli_connect('localhost','root','admin','BibliotecaMolinaM') or die("Error al conectar con la base de datos");

  /* if(isset($_GET['dni'])){
    $var = '%'.$_GET['dni'].'%';
    $stmt = mysqli_prepare($c1,'Select * from alumnos where dni like ?');
    $stmt->bind_param('s',$var);
  } else if(isset($_GET['nom'])){
    $var = '%'.$_GET['nom'].'%';
    $stmt = mysqli_prepare($c1,'Select * from alumnos where nombre like ? or apellidos like ?');
    $stmt->bind_param('ss',$var,$var);
  } 

  $stmt->execute();
  $rest = $stmt->get_result(); */
  $rest = mysqli_query($c1,'SELECT NOMBRE, APELLIDOS, DNI, ESTUDIOS, GRUPO FROM ALUMNOS A, MATRICULAS M WHERE A.ALUMNO=M.ALUMNO AND ESTUDIOS LIKE "%1º%Multi%"');
  $reg = mysqli_fetch_all($rest,MYSQLI_ASSOC);
  mysqli_close($c1);
?>

<pre><?=print_r($reg)?></pre>