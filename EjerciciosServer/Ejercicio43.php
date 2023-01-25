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
      $this->SetTextColor(0);
      $this->SetFillColor(255);
      $this->SetFont("arial","B", 10);
      $this->Image('Certificado/Logo JCCM.jpg',25,2,35);
      $this->Setxy(210/2,10);
      $this->Cell(210/2-20, 5, utf8_decode("Consejería de Educación, Cultura y Deportes"));
      $this->SetFontSize(9);
      $this->Setxy(210/2,15);
      $this->Cell(210/2-20, 5, utf8_decode("IES Pedro Mercedes"));
      $this->Setxy(210/2,20);
      $this->Cell(210/2-20, 5, utf8_decode("Cl. Cañete, S/N"));
      $this->Setxy(210/2,25);
      $this->Cell(210/2-20, 5, utf8_decode("16004 Cuenca (Cuenca)"));
    }
    function Footer(){
      $w=20;
      $h=297/2;
      $this->SetFont("arial","", 12);
      $this->Setxy($w,$h);
      $this->Cell(210/2-20, 5, utf8_decode("VºBº"),0,0,"C");
      $this->Setxy($w,$h+5);
      $this->Cell(210/2-20, 5, "EL DIRECTOR;",0,0,"C");
      $this->Image('Certificado/Director.png',$w+20,$h+15,40);
      $this->Setxy($w,$h+45);
      $this->Cell(210/2-20, 5, utf8_decode("Fdo: Don Miguel Ángel Ortega Prieto"),0,0,"C");
      $w=210/2;
      $this->Setxy($w,$h);
      $this->Cell(210/2-20, 5, "EL SECRETARIO;",0,0,"C");
      $this->Image('Certificado/Secretario.png',$w+20,$h+15,40);
      $this->Setxy($w,$h+45);
      $this->Cell(210/2-20, 5, utf8_decode("Fdo: Don Ramón Fuentes Cana"),0,0,"C");
      $this->Setxy(20,60);
    }
  }

  //Variables FPDF
  $pdf1=new pdfwt('P','mm','A4');
  $pdf1->AliasNbPages();
  $pdf1->SetMargins(20,20);
  $pdf1->SetStyle("b","arial","B",11,"0,0,0");
  $pdf1->Addpage();
  $pdf1->SetFont("arial","B", 11);
  $pdf1->SetStyle('s', 'Arial', '', 11, "0,0,0", 15);

  //Referencia
  $pdf1->Image('Certificado/Referencia.png',10,297/2-40);

  //?nom=Mario&ape1=Molina&ape2=Sanchez+Cruzado&sex=H&curso=2+de+Modulo+de+DAW
  //Variables Alumno/a
  $nombre = $_GET['nom'].' '.$_GET['ape1'].' '.$_GET['ape2'];
  $oa = ($_GET['sex']=='H') ? 'o' : 'a';
  $ela = ($_GET['sex']=='H') ? 'l' : ' la';
  $curso = $_GET['curso'];
  $fecha = strftime('%e de %B de %Y');

  //Textos
  $p1 = "<s>RAMÓN FUENTES CANA, SECRETARIO; DEL IES PEDRO MERCEDES DE CUENCA (CUENCA).</s>";
  $p2 = "CERTIFICA:";
  $p3 = "<s>Que ".$nombre." se encuentra matriculad".$oa." en ".$curso." como alumn".$oa." oficial de este centro durante el año académico 2022/2023.</s>";
  $p4 = "<s>Y para que conste, a petición de".$ela." interesad".$oa." y surta los efectos oportunos, expido el presente certificado en Cuenca (Cuenca) a ".$fecha.".</s>";

  /* $pdf1->WriteTag(150, 5, $p1); */

  $pdf1->output();
  /* $pdf1->Cell(210/2-20, 5, "A fecha de ".strftime("%d de %B de %Y")." ".utf8_decode(" PÃ¡g ".$this->PageNo()." de "."{nb}"),0,"J",false); */
}

?>