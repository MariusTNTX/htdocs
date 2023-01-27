<?
/* GENERAR PDF */
if(isset($_GET['pdf'])){

} else {
  /* AÑADIR A BBDD */

  
  //Si no existe la base de datos se crea junto con su tabla alumnos:
  if(isset($_GET['bbdd'])){ 
    include "../../includes/LoginMySql.php";
    $c = new mysqli($host, $user, $pass) or die("No ha podido realizarse la conexión");
    $rs=$c->query("show databases");
    $databases = $rs->fetch_all();
    if(!in_array("alumnos", $databases)){
      $c->query("create database Practicas");
      $c->query("use Practicas");
      $createQuery = "create table alumnos(dni varchar(9) primary key,nomApes varchar(50),fechaNac varchar(10),esRepet varchar(1) check (esRepet='S' or esRepet='N'),rutaFoto varchar(100));";
      if($c->query($createQuery)) echo "<br>Tabla creada con éxito";
      else echo "<br>Error al crear la tabla: ".$c->$error;
    }
  }
?>
<!-- FORMULARIO HTML -->

<?}?>