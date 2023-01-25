<?
	class uno{
		var $prop1;
		//Constructor
		function uno($var1){
			$this->prop1="Constructor";
		}
		function m1uno(){
			echo "Método de la clase uno <br>";
		}
	}
	
	class huno extends uno{
		public $proph1;
		//Constructor llamado por defecto (del padre)
		//Método sobreescrito
		function m1uno(){
			echo "Método de la clase hija->".$this->prop1."<br>";
			parent::m1uno();
		}
	}
	
	$objuno=new huno();
	$objuno->m1uno();
?>