<?
	class uno{
		public $var1=7;
		public $var2=9;
		function muno(){
			echo $this->var1."---".$this->var2;
		}
	}
	if(isset($_GET['boton'])){
		unserialize(urldecode($_GET['variable']))->muno();
	} else {
		$objetouno = new uno();
		?>										   	   <!--Se serializa el contenido del-->
		<form action="" method="get">				   <!--array para empaquetarlo-->
			<input type="hidden" name="variable" value="<?=urlencode(serialize($objetouno))?>">
			<input type="submit" name="boton" value="Enviar">
		</form>
	<?}
?>