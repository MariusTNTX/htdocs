<?
  include("../includes/fpdf/fpdf.php");
	define('FPDF_FONTPATH',"../includes/fpdf/font");

  //FUNCIONES
  function calWidth($pdf, $array, $font, $style, $size, $padding){
    $ancho = array_fill(0,count($array[0]),0);
    $pdf->SetFont($font, $style, $size);
    for($i=0; $i<count($array); $i++){
      for($j=0; $j<count($array[$i]); $j++){
        $new = $pdf->getstringwidth($array[$i][$j])+$padding;
        $ancho[$j] = ($ancho[$j] < $new) ? $new : $ancho[$j];
      }
    }
    return $ancho;
  }
	
  //EXTENSIÓN
  class fpdf2 extends FPDF {
		function Footer(){
			$this->Setxy(20,-10);
			$this->SetTextColor(0,0,0);
			$this->SetFont("courier","", 11);
      $txt = 'Pagina '.$this->pageno().' de {nb}';
			$this->Cell(0,5,$txt,'T',1,'C',0);
      $this->Setxy(20,20);
		}
	}

  //LECTURA
  $fic = fopen("Calorias.txt","r");
  while(!feof($fic)) $regs[] = fgetcsv($fic,1000,";");
	fclose($fic);
  array_pop($regs);

  //AJUSTE DEL ANCHO
  $pdf1=new fpdf2('P','mm','A4');
  $w = calWidth($pdf1,$regs,"courier","",11,4);
  if(array_sum($w) > 210-20) $pdf1=new fpdf2('L','mm','A4');
  if(array_sum($w) > 297-20){
    $size = 10;
    while(array_sum($w) > 297-20){
      $w = calWidth($pdf1,$regs,"courier","",$size,4);
      $size--;
    }
  }

  //VARIABLES
	$pdf1->setdisplaymode('fullpage',"single");
	$pdf1->setmargins(20,20);
  $pdf1->aliasnbpages();
	$pdf1->Addpage();
	$pdf1->SetTextColor(255);
  $pdf1->setfillcolor(0);
  $left = ($pdf1->getpagewidth()-array_sum($w)-40)/2;
  $pdf1->setxy(20+$left, 20);

  //ENCABEZADO
  foreach($regs[0] as $i => $reg){
    $pdf1->cell($w[$i], 10, $reg, 1, 0, 'C',true);
  }
  $pdf1->ln();
  $pdf1->setx(20+$left);
  array_shift($regs);

  //ELEMENTOS DE LA TABLA
	$pdf1->SetTextColor(0);
  $pdf1->setfillcolor(220,220,220);
  $fill = false;
  foreach($regs as $per){
    for($i=0; $i<count($per); $i++){
      $pdf1->cell($w[$i], 7, $per[$i], 1, 0, 'C', $fill);
    }
    $fill = ($fill) ? false : true;
    $pdf1->ln();
    $pdf1->setx(20+$left);
  }

  //ENVÍO Y CIERRE
	$pdf1->Output();
?>