<?
	$fic = fopen("USUARIOS.csv","w");
	//SOLUCIÓN CODIFICACIÓN: Añadir un header para admitir caracteres especiales en el fichero.
	fputs($fic, chr(0xEF).chr(0xBB).chr(0xBF)); 
	
	//ESCRITURA DE CAMPOS
	$campos = ["id","nombre","email"];
	fputcsv($fic,$campos,";");
	
	//ESRITURA DE REGISTROS
	$regs[] = [1111,"Mario'`´","msc@gmail.com"];
	$regs[] = [1112,"Jesús","jjc@hotmail.com"];
	$regs[] = [1113,"Ana","ahp@hotmail.com"];
	$regs[] = [1114,"Almudena","aec@educastillalamancha.com"];
	$regs[] = [1115,"Alejandro","agi@gmail.com"];
	
	foreach($regs as $r){
		fputcsv($fic,$r,";");
	}
	
	fclose($fic);
?>
<pre><?=print_r($regs)?></pre>