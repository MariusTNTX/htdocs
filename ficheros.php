<?
	$fic1 = fopen("fichero.txt","a+");
	fwrite($fic1,"\nnombre: Almudena; apellido1: Espinosa; apellido2: Cuevas; email: almu@gmail.com");
	fseek($fic1,0);
	$str=fread($fic1);
	fclose($fic1);
?>