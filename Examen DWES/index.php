<?
  include("conexion.php");
  try {
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass);
    if(!mysqli_query($c1,'use '.$dbname)){
      mysqli_query($c1,'create database '.$dbname);
      mysqli_query($c1,'use '.$dbname);
      mysqli_query($c1,'create table usuarios(nombre varchar(30) primary key, password varchar(100));');
      mysqli_query($c1,'create table preguntas(pregunta varchar(100) primary key, r1 varchar(100), r2 varchar(100), r3 varchar(100), r4 varchar(100), correcta enum("a","b","c","d"));');
      mysqli_query($c1,'create table resultados(pregunta varchar(100) primary key, aciertos varchar(1), fallos varchar(1));');
      $hash = password_hash('admin',PASSWORD_DEFAULT);
      mysqli_query($c1,'insert into usuarios values("admin","'.$hash.'")');
      
    }
  } catch (Exception $e) {
    echo "<h2 style='color:red'>Error al generar la base de datos, contacte con el administrador</h2>";
  }
  mysqli_close($c1);
  //Se valida si es usuario registrado y no es admin se hace un location a encuesta.php
  //Si es admin se redirige a administracion.php
  //Sino se redirigirá a noregistro.php
  if(isset($_GET['ingresar'])){
    try {
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
      $rest = mysqli_query($c1,'select * from usuarios where nombre like "'.$_GET['usuario'].'"');
      if($rest){
        $data = mysqli_fetch_all($rest,MYSQLI_ASSOC);
        //Coincidencia
        if(password_verify($_GET['contrasena'],$data[0]['password'])){
          //Login exitoso: Se verifica admin o usuario registrado
          if($data[0]['nombre']=='admin') header("Location: administracion.php");
          else header("Location: encuesta.php?usuario=".$_GET['usuario']);
        } else {
          //Credenciales incorrectas
          echo "Credenciales incorrectas";
        }
      } else {
        //Error
        echo "No se ha encontrado un usuario llamado ".$_GET['usuario'];
      }
      
    } catch (Exception $e) {
      echo "<h2 style='color:red'>Error al verificar el usuario, contacte con el administrador</h2>";
    }
  }
?>
<h1>Iniciar Sesión</h1>
<form action="" method="get">
  Usuario: <input type="text" name="usuario" value=""><br>
  Contraseña: <input type="text" name="contrasena" value=""><br><br>
  <input type="submit" name="ingresar" value="Ingresar"><br><br>
  <a href="registro.php">Registrarse</a><br>
  <a href="renovacionc.php">He olvidado mi contraseña</a>
</form>