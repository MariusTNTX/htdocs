<?
  include("../includes/fpdf/fpdf.php");
  define('FPDF_FONTPATH','../includes/fpdf/font');

  $pdf = new FPDF('P','mm','A4');
  $pdf->SetMargins(20,20);
  $pdf->SetFont('times','',12);
  $pdf->SetTextColor(0);
  $pdf->SetXY(20,20);
  $pdf->SetAutoPageBreak(true,20);
  $pdf->AddPage();

  $ancho = $pdf->GetPageWidth();
  $alto = $pdf->GetPageHeight();

  $pdf->Write(5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?');
  $pdf->Write(5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?');
  $pdf->Ln();
  $pdf->Ln();
  $pdf->Ln();
  $pdf->Cell(0,5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?',1,0,'C');
  $pdf->Cell(0,5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?',1,0,'C');
  $pdf->Ln();
  $pdf->Ln();
  $pdf->Ln();
  
  $y = $pdf->GetY();
  $pdf->MultiCell($ancho/2-20,5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?',1,'C');
  $pdf->SetXY($ancho/2,$y);
  $pdf->MultiCell($ancho/2-20,5,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, similique et velit facilis nostrum possimus atque veritatis dolore nihil. Error, quos! Voluptas eveniet eius sed! Animi odit voluptate pariatur. Dignissimos?',1,'C');
  
  header("Content-Type: application/pdf");
  $pdf->Output('I','miPdf',true);
?>