<?
  include("../../includes/fpdf/fpdf.php");
	define('FPDF_FONTPATH',"../../includes/fpdf/font");
	
	//Dimensiones
	$pdf1=new fpdf('P','mm','A4');
	//Representación
	$pdf1->setdisplaymode('fullpage',"single");
	//Margenes
	$pdf1->setmargins(20,20);
	//Margen de texo
	$pdf1->setxy(20, 20);
	//Color Texto
	$pdf1->SetTextColor(0,0,255);
	//Altura de linea
	$pdf1->SetLineWidth(5);
	//fuente y tamaño
	$pdf1->SetFont("courier","",11);

	//Página 1
	$pdf1->Addpage();
  
	//Lectura
  $fic=fopen("textoapdf.txt","r");
	$txt=fread($fic,filesize("textoapdf.txt"));
  fclose($fic);
  //Escritura
  $pdf1->write(5, $txt);

  //Pie de Página
	$pdf1->SetTextColor(0);
  $pdf1->aliasnbpages(); 
  $txt = 'Pagina '.$pdf1->pageno().' de {nb}';
  $pdf1->setautopagebreak(true, 0);
  $pdf1->setxy(0, -10);
  $pdf1->cell(210, 5, $txt, 0, 0, 'C');

  //Envío
	$pdf1->Output();
?>