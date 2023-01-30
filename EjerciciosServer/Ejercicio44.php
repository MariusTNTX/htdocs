<?
/* ?><pre><?=print_r($x)?></pre><? */

/* GENERAR PDF */
if(isset($_POST['pdf'])){
  include "../../includes/LoginMySql.php";
  include("../includes/fpdf/PDF_WriteTag.php");
  define('FPDF_FONTPATH',"../includes/fpdf/font");

  //EXTENSIÓN
  class fpdf2 extends FPDF {
    function Header(){
      $title = "LISTADO DE ALUMNOS MATRICULADOS";
      $this->SetFont('Arial','B',15);
      $w = $this->GetStringWidth($title);
      $this->SetX((210-15*2-$w)/2+15);
      $this->SetFillColor(255);
      $this->SetTextColor(0);
      $this->Cell($w,9,$title,0,1,'C',true);
      $this->Ln(5);
      $this->y0 = $this->GetY();
    }

    function Footer(){
      $this->SetY(-15);
      $this->SetFont('Arial','I',10);
      $this->SetTextColor(128);
      $this->Cell(0,10,utf8_decode('Página '.$this->PageNo().' de {nb}'),0,0,'C');
    }

    /* function SetCol(){
      $x = 15;
      $this->SetLeftMargin($x);
      $this->SetX($x);
    }

    function AcceptPageBreak(){
      $this->SetCol();
      $this->SetY($this->y0);
      return true;
    } */
  }

  //BÁSICO
  $pdf1=new fpdf2('P','mm','A4');
  $pdf1->setdisplaymode('fullpage',"single");
  $pdf1->AliasNbPages();
  $pdf1->SetMargins(15,15);
  $pdf1->Addpage();
  $pdf1->SetTextColor(0);
  $pdf1->SetFont("arial","B", 11);
  $w=[30,68,30,15];
  $top=30;
  $h=25;
  $pdf1->setxy(15,$top);

  //CONSULTA
  $c = new mysqli($host, $user, $pass, 'practicas') or die("No ha podido realizarse la conexión");
  $res = $c->query("select * from alumnos order by nomApes;");
  $encab = $res->fetch_fields();
  $c->close();

  //ENCABEZADO
  $pdf1->cell(40, 20, 'Foto');
  $pdf1->setxy(15+$h+10,$top);
  for($i=0; $i<4; $i++){
    $pdf1->cell($w[$i], 20, utf8_decode($encab[$i]->name));
  }
  $pdf1->line(15,$top+15,210-15,$top+15);

  //CONTENIDO
  $pdf1->SetFont("arial","", 11);
  $top+=25;
  $pdf1->setxy(15+$h+10,$top);

  while($fila = $res->fetch_row()){
    /* $pdf1->Image($fila[4],15,$pdf1->gety(),$h); */ //$top
    $pdf1->cell(0.1, 20, $pdf1->Image($fila[4],15,$pdf1->gety(),$h));
    array_pop($fila);
    for($i=0; $i<4; $i++){
      $pdf1->cell($w[$i], 20, utf8_decode($fila[$i]));
    }
    $pdf1->Ln(25);
    $pdf1->setx(15+$h+10);
    /* $top+=$h;
    $pdf1->setxy(15+$h+10,$top); */
  }

  //ENVÍO Y CIERRE
  $pdf1->Output();

  //-----------------------------------------------------------------------------------------------

} else {
  /* AÑADIR A BBDD */
  if(isset($_POST['anadir'])){

    //Si no existe la base de datos se crea junto con su tabla alumnos:
    include "../../includes/LoginMySql.php";
    $c = new mysqli($host, $user, $pass) or die("No ha podido realizarse la conexión");
    $rs=$c->query("show databases");
    $databases = $rs->fetch_all();
    foreach($databases as $base) $bases[] = $base[0];
    if(!in_array("practicas", $bases)){
      $c->query("create database Practicas");
      $c->query("use Practicas");
      $createQuery = "create table alumnos(dni varchar(9) primary key,nomApes varchar(50),fechaNac varchar(10),esRepet varchar(1) check (esRepet='S' or esRepet='N'),rutaFoto varchar(100));";
      if(!$c->query($createQuery)) echo "<br>Error al crear la tabla: ".$c->$error;
    }

    //Almacenar valores
    $dni = $_POST['dni'];
    $nomApes = $_POST['nom'].' '.$_POST['apes'];
    $fnac = $_POST['fnac'];
    $repet = ($_POST['repet']=='on') ? 'S' : 'N';
    $foto = 'Alumnos/'.$_FILES['foto']['name'];
    move_uploaded_file($_FILES['foto']['tmp_name'],$foto);

    //Añadir nuevo registro
    $c->query("use Practicas");
    $c->query("insert into alumnos values ('$dni','$nomApes','$fnac','$repet','$foto');");
    $c->close();
  }

  //-----------------------------------------------------------------------------------------------
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

      <form class="needs-validation mt-5" novalidate="" action="" method="post" enctype="multipart/form-data">
        <div class="row mb-5">
          <div class="col-6"><h2 class="">Nuevo Alumno</h2></div>
          <div class="col-6 text-end"><input type="submit" class="btn btn-primary" name="pdf" value="Generar PDF"></div>
        </div>

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

          <div class="col-3"></div>
          <div class="col-6">
            <button class="w-100 btn btn-primary btn-lg mt-5" type="submit" name="anadir" value="anadir">Añadir Alumno/a</button>
          </div>
        
      </form>

    </div>
  </div>
</body>
</html>

<?}?>