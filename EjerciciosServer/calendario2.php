<?
	function calendario($mes, $anio){
		$numDias = cal_days_in_month(CAL_GREGORIAN, $mes, $anio);
		
		//Festivos
		$festivos = array('1/1','6/1','15/8','12/10','1/11','6/12','8/12');
		$diaPascua = date("d",easter_date($anio));
		$mesPascua = date("n",easter_date($anio));
		array_push($festivos,$diaPascua.'/'.$mesPascua);
		array_push($festivos,($diaPascua-2).'/'.$mesPascua);
		
		//Aray caledario
		$dia=1;
		$diaSemanaInic = date("N",mktime(0,0,0,$mes,1,$anio));
		for($i=1; $i<$diaSemanaInic; $i++) $calen[1][$i]=0;
		for($s=1; $s<=6; $s++){
			for($d=1; $d<=7; $d++){
				if($calen[$s][$d]!="0" && $dia<=$numDias){
					$calen[$s][$d]=$dia;
					$dia++;
				}
			}
		} 
		
		//Cabecera tabla
		$nombreMes=mktime(0,0,0,$mes,1,$anio);
		setlocale(LC_TIME, "esp");
		echo "<table><caption>".strtoupper(strftime("%B",$nombreMes))." - $anio</caption>";
		echo "<tr><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sabado</th><th>Domingo</th></tr>";
		
		//Imprimir tabla
		foreach($calen as $semana){
			echo "<tr>";
			foreach($semana as $i => $d){
				echo "<td";
				if($d!="0"){
					if(in_array("$d/$mes",$festivos) || $i == 7) echo " style='background-color:red;color:white;'";
					echo '>'.$d."</td>";
				} else echo "></td>";
			}
			echo "</tr>";
		}
		echo "</table>";
?>
	<pre><?=print_r($calen)?></pre>	
	<pre><?=print_r($festivos)?></pre>	
<?}?>
	
