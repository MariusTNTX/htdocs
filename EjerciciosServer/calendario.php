<?
	function calendario($mes, $anio){
		//Se calcula el número de días
		$numDias = cal_days_in_month(CAL_GREGORIAN, $mes, $anio);

		//Array de Festivos: Se calcula el domingo de resurrección y se añaden los 3 días festivos de semana santa
		$festivos = array('1/1','6/1','1/5','15/8','12/10','1/11','6/12','8/12','25/12');
		$domRes = date("d",easter_date($anio));
		for($i=0; $i<3; $i++) array_push($festivos,($domRes-$i).'/'.date("n",easter_date($anio)));

		//Se inicializa dia y semana a 1, se obtiene el nombre del mes en castellano y se imprime la cabecera de la tabla
		$dia=1;
		$semana=1;
		$nombreMes=mktime(0,0,0,$mes,1,$anio);
		setlocale(LC_TIME, "esp");
		echo "<table><caption>".strtoupper(strftime("%B",$nombreMes))." - $anio</caption><tr><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th><th>Domingo</th></tr>";
		
		//Se recorren las semanas del calendario:
		for($i=1; $i<=$semana; $i++){
			echo "<tr>";
			//1. Se recorre cada dia de la semana
			for($j=1; $j<=7; $j++){
				$diaSemana = date("N",mktime(0,0,0,$mes,$dia,$anio));
				//1.1. Si el día de la semana coincide con $j y no supera los días del mes se imprime:
				if($diaSemana == $j && $dia<=$numDias){
					echo "<td";
					//Si es festivo se añade fondo rojo y color blanco
					if(in_array("$dia/$mes",$festivos) || $diaSemana == 7) echo " style='background-color:red;color:white;'";
					echo ">";
					echo $dia;
					$dia++;
				//1.2. Sino imprime en blanco
				} else echo "<td>";
				echo "</td>";
			}
			echo "</tr>";
			//2. Si se necesita una semana más se añade
			if($dia<$numDias) $semana++;
		}
		echo "</table>";
	}
?>
