<?

if(isset($_GET['img'])){
  $fuente = "C:\Apache24\htdocs\EjerciciosServer\arial.ttf";
  $img=imagecreate(25,115);
  $blanco = imagecolorallocate($img,255,255,255);
  $negro = imagecolorallocate($img,0,0,0);
  imagettftext($img,8,90,15,115-5,$negro,$fuente,"Ref.Doc.: CertMatAlu");
  header("Content-type: image/png");
  imagepng($img);
  imagedestroy($img);
} else {

  include("../includes/fpdf/PDF_WriteTag.php");
  define('FPDF_FONTPATH',"../includes/fpdf/font");
  include("calcFechas.php");

  date_default_timezone_set('Europe/Madrid');
  setlocale(LC_TIME, 'esp');

  class pdfwt extends PDF_WriteTag {
    function Header(){
      $x = 210/2+15;
      $this->SetTextColor(0);
      $this->SetFillColor(255);
      $this->SetFont("arial","B", 12);
      $this->Image('../images/logoCIFP.png',10,8,60);
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

  //Variables
  $nomAlu = $_GET['nomAlu'].' '.$_GET['apeAlu'];
  $dni = $_GET['dni'];
  $dep = $_GET['dep'];
  $cen = $_GET['cen'];
  $isbn = strstr($_GET['isbn'],'_',true);
  $tit = $_GET['tit'];
  $fecha = strftime('%e de %B del %Y');
  /* $fecha2 = new DateTime();
  $fecha2 = $fecha2->createFromFormat('d/m/Y', $_GET['fec']);
  $fecha2 = strftime('%e de %B del %Y',$fecha2->getTimestamp()); */

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

  //Variables FPDF
  $pdf1=new pdfwt('P','mm','A4');
  $pdf1->AliasNbPages();
  $pdf1->SetMargins(20,20);
  $pdf1->SetStyle("b","arial","B",11,"0,0,0");
  $pdf1->Addpage();
  $pdf1->SetFont("arial","B", 11);
  $pdf1->SetStyle('s', 'Arial', '', 11, "0,0,0", 15);
  $pdf1->SetStyle('i', 'Arial', 'I', 11, "0,0,0");

  //Textos
  $p1 = "<s>".strtr(strtoupper($nomJfk),'áéíóú','ÁÉÍÓÚ').", JEFE/A DEL DE PARTAMENTO DE ".strtr(strtoupper($dep),'áéíóú','ÁÉÍÓÚ')." DEL CENTRO ".strtr(strtoupper($cen),'áéíóú','ÁÉÍÓÚ')." <b>CERTIFICA</b>:</s>";
  $p2 = "<s><i>Que el/la usuario/a ".$nomAlu." con DNI ".$dni." ha efectuado la <b>RECOGIDA</b> del ejemplar \"".$tit."\" con ISBN ".$isbn." el día".$fecha." y se compromete a <b>devolverlo antes del".$fecha2."</b>.</i></s>";
  $pdf1->Setxy(20,40);
  $pdf1->WriteTag(0, 5, utf8_decode($p1), 0, 'L', 0, 20);
  $pdf1->Sety(60);
  $pdf1->WriteTag(0, 5, utf8_decode($p2), 0, 'L', 0, 20);

  $p3 = "<s>".strtr(strtoupper($nomJfk),'áéíóú','ÁÉÍÓÚ').", JEFE/A DEL DE PARTAMENTO DE ".strtr(strtoupper($dep),'áéíóú','ÁÉÍÓÚ')." DEL CENTRO ".strtr(strtoupper($cen),'áéíóú','ÁÉÍÓÚ')." <b>CERTIFICA</b>:</s>";
  $p4 = "<s><i>Que el/la usuario/a ".$nomAlu." con DNI ".$dni." ha efectuado la <b>DEVOLUCIÓN</b> del ejemplar \"".$tit."\" con ISBN ".$isbn." el día ___ de _______________ del _______.</i></s>";
  $pdf1->Setxy(20,160);
  $pdf1->WriteTag(0, 5, utf8_decode($p3), 0, 'L', 0, 20);
  $pdf1->Sety(180);
  $pdf1->WriteTag(0, 5, utf8_decode($p4), 0, 'L', 0, 20);

  //Linea
  $pdf1->line(20,165,190,165);

  //Firmas
  $w=20;
  $h=110; //297/2+20
  $pdf1->SetFont("arial","", 12);
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA JEFE/A DE DEPARTAMENTO:",0,0,"C");
  $pdf1->Setxy($w,$h+35);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomJfk),0,0,"C");
  $w=210/2;
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA ALUMNO/A;",0,0,"C");
  $pdf1->Setxy($w,$h+35);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomAlu),0,0,"C");
  $pdf1->Setxy(20,60);

  $w=20;
  $h=230; //297/2+20
  $pdf1->SetFont("arial","", 12);
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA JEFE/A DE DEPARTAMENTO:",0,0,"C");
  $pdf1->Setxy($w,$h+35);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomJfk),0,0,"C");
  $w=210/2;
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL/LA ALUMNO/A;",0,0,"C");
  $pdf1->Setxy($w,$h+35);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: ".$nomAlu),0,0,"C");
  $pdf1->Setxy(20,60);

  $pdf1->output();
  /* $pdf1->Cell(210/2-20, 5, "A fecha de ".strftime("%d de %B de %Y")." ".utf8_decode(" PÃ¡g ".$this->PageNo()." de "."{nb}"),0,"J",false); */
}

?>