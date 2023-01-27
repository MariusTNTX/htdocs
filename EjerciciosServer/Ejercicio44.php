<?
/* GENERAR PDF */
if(isset($_POST['pdf'])){

} else {
  /* AÑADIR A BBDD */
  if(isset($_POST['anadir'])){

    //Si no existe la base de datos se crea junto con su tabla alumnos:
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

    //Almacenar valores
    $dni = $_POST['dni'];
    $nomApes = $_POST['nom'].' '.$_POST['apes'];
    $fnac = $_POST['fnac'];
    $repet = ($_POST['fnac']=='on') ? 'S' : 'N';
    $foto = 'C:/Apache24/htdocs/EjerciciosServer/Alumnos/'.$_FILES['foto']['name'];
    move_uploaded_file($_FILES['foto']['tmp_name'],$foto);

    //Añadir nuevo registro
    $c->query("use Practicas");
    $c->query("insert into alumnos values ('$dni','$nomApes','$fnac','$repet','$foto');");
    $c->close();
  }
?>
<!-- FORMULARIO HTML -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <title>Ejercicio 44 PHP</title>
</head>
<body>
  <div class="row justify-content-center">
    <div class="col-6">

      <div class="row mb-5 mt-4">
        <div class="col-6"><h2 class="">Nuevo Alumno</h2></div>
        <div class="col-6 text-end"><button class="btn btn-primary" type="submit">Generar PDF</button></div>
      </div>
      
      <form class="needs-validation" novalidate="" action="" method="post" enctype="multipart/form-data">
        <div class="row g-3">
          <div class="col-4">
            <label for="firstName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="firstName" placeholder="" name="nom" value="" required="">
            <div class="invalid-feedback">
              El campo "Nombre" es obligatorio
            </div>
          </div>

          <div class="col-8">
            <label for="lastName" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="lastName" placeholder="" name="apes" value="" required="">
            <div class="invalid-feedback">
            El campo "Apellidos" es obligatorio
            </div>
          </div>

          <div class="col-12">
            <label for="dni" class="form-label">DNI</label>
            <input type="text" class="form-control" id="dni" placeholder="Ejemplo: 12345678A" name="dni" required="">
            <div class="invalid-feedback">
            El campo "DNI" es obligatorio
            </div>
          </div>

          <div class="col-12">
            <label for="fnac" class="form-label">Fecha de Nacimiento</label>
            <input type="text" class="form-control" id="fnac" placeholder="Ejemplo: 18/10/1999" name="fnac" required="">
            <div class="invalid-feedback">
            El campo "Fecha de Nacimiento" es obligatorio
            </div>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" name="repet" id="repet">
              <label class="form-check-label" for="repet">Tiene al menos un curso repetido</label>
            </div>
          </div>
          
          <div class="col-12">
            <label for="foto" class="form-label">Fotografía</label>
            <input type="file" class="form-control" id="foto" placeholder="Ejemplo: 12345678A" name="foto" required="">
            <div class="invalid-feedback">
            El campo "Fotografía" es obligatorio
            </div>
          </div>

        <button class="w-100 btn btn-primary btn-lg mt-5" type="submit" name="anadir" value="anadir">Añadir Alumno/a</button>
      </form>

    </div>
  </div>
</body>
</html>

<?}?>