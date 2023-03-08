<?
include("../includes/fpdf/fpdf.php");
define('FPDF_FONTPATH',"../includes/fpdf/font");

//EXTENSIÓN
class fpdf2 extends FPDF {
  function Header(){
    $title = "LA REGENTA - Leopoldo Alas, Clarin";
    $this->SetFont('Arial','B',15);
    $w = $this->GetStringWidth($title);
    $this->SetX(15);
    $this->SetFillColor(255);
    $this->SetTextColor(0);
    $this->Cell($w,9,$title,0,1,'L',true);
    $this->Ln(5);
    $this->y0 = $this->GetY();
  }

  function Footer(){
    $this->SetY(-15);
    $this->SetFont('Arial','I',8);
    $this->SetTextColor(128);
    $this->Cell(0,10,'Pagina '.$this->PageNo().' de {nb}',0,0,'C');
  }

  function SetCol($col){
    $this->col = $col;
    $x = ($col == 1) ? 15+128.5+10 : 15;
    $this->SetLeftMargin($x);
    $this->SetX($x);
  }

  function AcceptPageBreak(){
    if($this->col<1){
      $this->SetCol($this->col+1);
      $this->SetY($this->y0);
      return false;
    } else {
      $this->SetCol(0);
      return true;
    }
  }
}

//VARIABLES
$pdf1=new fpdf2('L','mm','A4');
$pdf1->setdisplaymode('fullpage',"single");
$pdf1->setmargins(15,15);
$pdf1->aliasnbpages();
$pdf1->Addpage();
$pdf1->SetTextColor(0);
$pdf1->SetFont('Arial','',11);

//LECTURA
$texto = file_get_contents("Regenta.txt");

//IMPRESIÓN
$w=(297-15*2-10)/2;
$pdf1->multicell($w, 5, $texto);

//ENVÍO Y CIERRE
$pdf1->Output();
?>