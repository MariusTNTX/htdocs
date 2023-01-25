<?
  include('./includes/fpdf/fpdf.php');
  define('FPDF_FONTPATH',"./includes/fpdf/font/");
  $dimensiones=array (210,297);
		$pdf1=new fpdf('P','mm',$dimensiones);
	//ajustamos modo de representacion
		$pdf1->setdisplaymode('fullpage',"single");
	//insertamos una página en blanco
		$pdf1->Addpage();

//Estableceremos los colores para bordes, fondos y textos
	//color de borde
		$pdf1->SetDrawColor(255,0,0);
	//color del relleno (gris)
		$pdf1->SetFillColor(200);
	//color del texto
		$pdf1->SetTextColor(0,0,255);

//Establecemos espesores de lineas y tipo y tamaño de letra
	//espesor de linea 1 milimetro
		$pdf1->SetLineWidth(1);
	//fuente y tamaño: Courier, negrita de 12 puntos
		$pdf1->addfont("algerian","","ALGER.php");
		$pdf1->SetFont("algerian","",12);
	
//Establecemos el texto para la celda
		$celda1="Este es el texto que ira dentro de la celda Este es el texto que ira dentro de la celda";
	//determinamos el tamaño de esta cadena y lo recogemos en la variable ancho
		$ancho=$pdf1->GetStringWidth($celda1);
	/* definimos la celda estableciendo:
	ancho--- igual al de la cadena que va a contener + 6 mm.
	alto --- 6 milimetros
	texto--- el contenido de la variable $celda1
	borde--- 1 (para que ponga los cuatro bordes
	celda siguiente--- 0 (para que la incluya a continuación de la actual)
	alineación --- C para que centre el texto en la celda horizontalmente
	relleno --- 1 para que aplique el fondo a la celda
	enlace--- de momento no lo incluimos, lo haremos posteriormente
	como aun no hemos insertaod ningún elemento en la página
	la celda aparecerá en la parte superior izquierda de la página*/
		$pdf1->Cell(10,6,$celda1,1,0,'L',1);
	
//Vamos a crear un enlace interno mediante la función AddLink()
	//y vamos a recoger el resultado en la variable $salta
		$salta=$pdf1->AddLink();
	//estableceremos la referencia del enlace
		$pdf1->SetLink($salta,0,2);

//Crearemos ahora una zona para el enlace (zona sensible), un rectangulo
		$pdf1->Link(10,10,$ancho+6,6,$salta);
	
	//Añadimos una nueva página
		$pdf1->Addpage();
	
//Activamos el valor por defecto del señalador de número total de páginas
	//al no incluir nada como parámetro de la funcion AliasNbPages();
	//deberemos recurrir al señalador por defecto {nb}
		$pdf1->AliasNbPages();
	
//Escribimos numero de pagina y total de paginas
		$pdf1->write(5,"Pagina ".$pdf1->PageNo()." de {nb}",);

//Enviamos la salida al navegador
	$pdf1->Output();
?>