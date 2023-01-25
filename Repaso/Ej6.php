<?
	function mostrarFormulario($screen){
		?><form action="" method="get">
			<input type="text" name="screen" value="<?=$screen?>">
			<input type="submit" name="back" value="<=="><br>
			
			<input type="submit" name="num" value="7">
			<input type="submit" name="num" value="8">
			<input type="submit" name="num" value="9">
			<input type="submit" name="oper" value="+"><br>
			
			<input type="submit" name="num" value="4">
			<input type="submit" name="num" value="5">
			<input type="submit" name="num" value="6">
			<input type="submit" name="oper" value="-"><br>
			
			<input type="submit" name="num" value="1">
			<input type="submit" name="num" value="2">
			<input type="submit" name="num" value="3">
			<input type="submit" name="oper" value="*"><br>
			
			<input type="submit" name="num" value="0">
			<input type="submit" name="clear" value="C">
			<input type="submit" name="result" value="=">
			<input type="submit" name="oper" value="/">
		</form><?
	}
	
	$screen = (isset($_GET['screen'])) ? $_GET['screen'] : "";
	
	if(isset($_GET['back'])){
		if(strlen($screen)>0) $screen = substr($screen,0,-1);
	} else if(isset($_GET['num'])){
		$screen.=$_GET['num'];
	} else if(isset($_GET['oper'])){
		$screen.=$_GET['oper'];
	} else if(isset($_GET['clear'])){
		$screen="";
	} else if(isset($_GET['result'])){
		eval('$screen = '.$screen.';');
	}
	
	mostrarFormulario($screen);
?>