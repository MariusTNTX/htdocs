<!--EJERCICIO 6A:

Crear una calculadora con 3 items: 2 para numeros y uno para el resultado. 
Debajo tendrá 5 botones: 4 botones para las operaciones básicas y otro para el igual.-->

<html>
<body>

	<?
	$result="";
	$num1="";
	$num2="";
	if(isset($_GET['op'])){
		/*Se almacenan los numeros para que no desaparezcan 
		  después de elegir una operación */
		$num1=$_GET['n1'];
		$num2=$_GET['n2'];
		$operacion=$_GET['op'];
	}
	elseif(isset($_GET['result'])){
		$num1=$_GET['n1'];
		$num2=$_GET['n2'];
		$operacion=$_GET['oper'];
		switch($operacion){
			case "+": $result=$num1+$num2;
				break;
			case "-": $result=$num1-$num2;
				break;
			case "*": $result=$num1*$num2;
				break;
			case "/": $result=$num1/$num2;
				break;
			default;
				$result='Error: p = '.$operacion;
		}
		/*Se vacían los numeros para que 
		  desaparezcan tras cada operación */
		$num1="";
		$num2="";
	}
	?>

	<form action="" method="get">
		<input type="text" name="n1" value="<?=$num1?>" required>
		<input type="text" name="n2" value="<?=$num2?>" required><br><br>
		<input type="submit" name="op" value="+">
		<input type="submit" name="op" value="-">
		<input type="submit" name="op" value="*">
		<input type="submit" name="op" value="/">
		<input type="hidden" name="oper" value="<?=$operacion?>">
		<br><br>
		<input type="submit" name="result" value="="><br><br>
		Resultado:
		<input type="text" name="resultado" value="<?=$result?>">
	<form>
	
</body>
</html>