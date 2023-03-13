<?
  //Evitar Warnings, deprecated y enotived
  ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);

  //Include de PDF_WriteTag (estilos)
  include("../includes/fpdf/PDF_WriteTag.php");
  define('FPDF_FONTPATH',"../includes/fpdf/font");
  include("calcFechas.php");

  //Establecimiento del localismo (Español)
  date_default_timezone_set('Europe/Madrid');
  setlocale(LC_TIME, 'es_ES.UTF-8');

  //Clase PDFWT: Header
  class pdfwt extends PDF_WriteTag {
    function Header(){
      $x = 210/2+15;
      $this->SetTextColor(0);
      $this->SetFillColor(255);
      $this->SetFont("arial","B", 12);
      $this->Image('../imagenes/logocifp.png',10,8,60);
      $this->Setxy($x,10);
      $this->Cell(210/2-30, 5, utf8_decode($_GET['cen']),0,0,'R');
      $this->SetFontSize(9);
      $this->Setxy($x,15);
      $this->Cell(210/2-30, 5, utf8_decode($_GET['dep']),0,0,'R');
      $this->Setxy(20,35);
      $this->SetFontSize(20);
      $this->Cell(0, 10, utf8_decode("FORMALIZACIÓN DE PRÉSTAMO"),0,0,'C');
      $this->SetFont("arial","B", 10);
    }
  }

  //Variables de la URL
  $nomAlu = $_GET['nomAlu'].' '.$_GET['apeAlu'];
  $dni = $_GET['dni'];
  $dep = $_GET['dep'];
  $cen = $_GET['cen'];
  $isbn = strstr($_GET['isbn'],'_',true);
  $tit = $_GET['tit'];
  $fecha = strftime('%e de %B del %Y');

  //Cálculo de fecha de devolución
  $fecha2 = new DateTime("+30 days");
  if($fecha2->format('l')=='Saturday') $fecha2->modify("+2 days");
  else if($fecha2->format('l')=='Sunday') $fecha2->modify("+1 days");
  $fecha2 = strftime('%e de %B del %Y',$fecha2->getTimestamp());

  //Obtención de nombre y apellidos del JFK
  $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
  $resp = mysqli_query($c1, 'SELECT P.NOMBRE, APELLIDOS FROM PROFESORES P, DEPARTAMENTOS D WHERE DNI=DNI_JFK AND D.COD_DPTO='.$_GET['codDpto']);
  $data = mysqli_fetch_all($resp,MYSQLI_ASSOC);
  $nomJfk = $data[0]['NOMBRE'].' '.$data[0]['APELLIDOS'];
  mysqli_close($c1);

  //Variables de inicio FPDF
  $pdf1=new pdfwt('P','mm','A4');
  $pdf1->AliasNbPages();
  $pdf1->SetMargins(20,20);
  $pdf1->SetStyle("b","arial","B",11,"0,0,0");
  $pdf1->Addpage();
  $pdf1->SetFont("arial","B", 11);
  $pdf1->SetStyle('s', 'Arial', '', 11, "0,0,0", 15);
  $pdf1->SetStyle('i', 'Arial', 'I', 11, "0,0,0");

  //TEXTOS

  //Recogida
  $p1 = "<s>".strtr(strtoupper($nomJfk),'áéíóú','ÁÉÍÓÚ').", JEFE/A DE LA FAMILIA PROFESIONAL DE ".strtr(strtoupper($dep),'áéíóú','ÁÉÍÓÚ')." DEL CENTRO ".strtr(strtoupper($cen),'áéíóú','ÁÉÍÓÚ')." <b>CONFIRMA</b>:</s>";
  $p2 = "<s><i>Que el/la usuario/a ".$nomAlu." con DNI ".$dni." ha efectuado la <b>RECOGIDA</b> del ejemplar \"".$tit."\" con ISBN ".$isbn." el día ".$fecha." y se compromete a <b>devolverlo antes del ".$fecha2."</b>.</i></s>";
  $pdf1->Setxy(20,40);
  $pdf1->WriteTag(0, 5, utf8_decode($p1), 0, 'J', 0, 20);
  $pdf1->Sety(60);
  $pdf1->WriteTag(0, 5, utf8_decode($p2), 0, 'J', 0, 20);
  //Devolución
  $p3 = "<s>".strtr(strtoupper($nomJfk),'áéíóú','ÁÉÍÓÚ').", JEFE/A DE LA FAMILIA PROFESIONAL DE ".strtr(strtoupper($dep),'áéíóú','ÁÉÍÓÚ')." DEL CENTRO ".strtr(strtoupper($cen),'áéíóú','ÁÉÍÓÚ')." <b>CONFIRMA</b>:</s>";
  $p4 = "<s><i>Que el/la usuario/a ".$nomAlu." con DNI ".$dni." ha efectuado la <b>DEVOLUCIÓN</b> del ejemplar \"".$tit."\" con ISBN ".$isbn." el día ___ de _______________ del _______.</i></s>";
  $pdf1->Setxy(20,160);
  $pdf1->WriteTag(0, 5, utf8_decode($p3), 0, 'J', 0, 20);
  $pdf1->Sety(180);
  $pdf1->WriteTag(0, 5, utf8_decode($p4), 0, 'J', 0, 20);

  //LINEA
  $pdf1->line(20,165,190,165);

  //FIRMAS

  //Recogida
  $w=20;
  $h=115; //297/2+20
  $pdf1->SetFont("arial","", 12);
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA JEFE/A DE DEPARTAMENTO:",0,0,"C");
  $pdf1->Setxy($w,$h+30);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomJfk),0,0,"C");
  $w=210/2;
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA ALUMNO/A;",0,0,"C");
  $pdf1->Setxy($w,$h+30);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomAlu),0,0,"C");
  $pdf1->Setxy(20,60);
  //Devolución
  $w=20;
  $h=235; //297/2+20
  $pdf1->SetFont("arial","", 12);
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA JEFE/A DE DEPARTAMENTO:",0,0,"C");
  $pdf1->Setxy($w,$h+30);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomJfk),0,0,"C");
  $w=210/2;
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA ALUMNO/A;",0,0,"C");
  $pdf1->Setxy($w,$h+30);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomAlu),0,0,"C");
  $pdf1->Setxy(20,60);

  //IMPRESIÓN
  $pdf1->output();
?>