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

  date_default_timezone_set('Europe/Madrid');
  setlocale(LC_TIME, 'esp');

  class pdfwt extends PDF_WriteTag {
    function Header(){
      $x = 210/2+15;
      $this->SetTextColor(0);
      $this->SetFillColor(255);
      $this->SetFont("arial","B", 10);
      /* $this->Image('../images/Logo JCCM.jpg',15,2,35); */
      $this->Image('../images/logoCIFP.png',10,8,60);
      $this->Setxy($x,10);
      $this->Cell(210/2-20, 5, utf8_decode("CIFP1"));
      $this->SetFontSize(9);
      $this->Setxy($x,15);
      $this->Cell(210/2-20, 5, utf8_decode("INFORMACIÓN Y ORIENTACIÓN PROFESIONAL"));
      /* $this->Setxy($x,20);
      $this->Cell(210/2-20, 5, utf8_decode("Calle de la Fuensanta, 3"));
      $this->Setxy($x,25);
      $this->Cell(210/2-20, 5, utf8_decode("16002 Cuenca (Cuenca)")); */
    }
    /* function Footer(){
      $w=20;
      $h=297/2+20;
      $this->SetFont("arial","", 12);
      $this->Setxy($w,$h);
      $this->Cell(210/2-20, 5, utf8_decode("VºBº"),0,0,"C");
      $this->Setxy($w,$h+5);
      $this->Cell(210/2-20, 5, "EL DIRECTOR;",0,0,"C");
      $this->Image('../images/Director.png',$w+20,$h+15,40);
      $this->Setxy($w,$h+45);
      $this->Cell(210/2-20, 5, utf8_decode("Fdo: Don Miguel Ángel Ortega Prieto"),0,0,"C");
      $w=210/2;
      $this->Setxy($w,$h);
      $this->Cell(210/2-20, 5, "EL SECRETARIO;",0,0,"C");
      $this->Image('../images/Secretario.png',$w+20,$h+15,40);
      $this->Setxy($w,$h+45);
      $this->Cell(210/2-20, 5, utf8_decode("Fdo: Don Ramón Fuentes Cana"),0,0,"C");
      $this->Setxy(20,60);
    } */
  }

  //Variables FPDF
  $pdf1=new pdfwt('P','mm','A4');
  $pdf1->AliasNbPages();
  $pdf1->SetMargins(20,20);
  $pdf1->SetStyle("b","arial","B",11,"0,0,0");
  $pdf1->Addpage();
  $pdf1->SetFont("arial","B", 11);
  $pdf1->SetStyle('s', 'Arial', '', 11, "0,0,0", 15);

  //Firmas
  $w=20;
  $h=297/2+20;
  $pdf1->SetFont("arial","", 12);
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, utf8_decode("VºBº"),0,0,"C");
  $pdf1->Setxy($w,$h+5);
  $pdf1->Cell(210/2-20, 5, "EL DIRECTOR;",0,0,"C");
  $pdf1->Image('../images/Director.png',$w+20,$h+15,40);
  $pdf1->Setxy($w,$h+45);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: Don Miguel Ángel Ortega Prieto"),0,0,"C");
  $w=210/2;
  $pdf1->Setxy($w,$h);
  $pdf1->Cell(210/2-20, 5, "EL SECRETARIO;",0,0,"C");
  $pdf1->Image('../images/Secretario.png',$w+20,$h+15,40);
  $pdf1->Setxy($w,$h+45);
  $pdf1->Cell(210/2-20, 5, utf8_decode("Fdo: Don Ramón Fuentes Cana"),0,0,"C");
  $pdf1->Setxy(20,60);

  //?nom=Mario&ape1=Molina&ape2=Sanchez+Cruzado&sex=H&curso=2+de+Modulo+de+DAW
  //Variables Alumno/a
  $nombre = $_GET['nom'].' '.$_GET['ape1'].' '.$_GET['ape2'];
  $oa = ($_GET['sex']=='H') ? 'o' : 'a';
  $ela = ($_GET['sex']=='H') ? 'l' : ' la';
  $curso = $_GET['curso'];
  $fecha = strftime('%e de %B de %Y');

  //Textos
  $p1 = "<s>FRANCISCO JOSÉ ÁLVARO PERONA, JEFE DEL DE PARTAMENTO DE INFORMÁTICA Y COMUNICACIONES DEL CENTRO CIFP1 CERTIFICA:.</s>";
  $p2 = "<s>Que el alumno Mario Molina Sánchez-Cruzado con DNI 04639131P ha efectuado la recogida del ejemplar \"Tratamientos Psicológicos\" con ISBN 123456789123 (1) en la fecha 07/03/2023.</s>";

  $pdf1->Setxy(20,60);
  $pdf1->WriteTag(0, 5, utf8_decode($p1), 0, 'L', 0, 20);
  $pdf1->Sety(85);
  $pdf1->WriteTag(0, 5, utf8_decode($p2), 0, 'L', 0, 20);

  $pdf1->output();
  /* $pdf1->Cell(210/2-20, 5, "A fecha de ".strftime("%d de %B de %Y")." ".utf8_decode(" PÃ¡g ".$this->PageNo()." de "."{nb}"),0,"J",false); */
}

?>