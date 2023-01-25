<?
	class Boleto{
		
		function __construct(){
			$this->numeros = [];
			while(count($this->numeros) < 6){
				$num = rand(1, 9);
				if(!in_array($num, $this->numeros)){
					array_push($this->numeros, $num);
				}
			}
		}
		
		function getBoleto(){
			return $this->numeros;
		}
		
		function getNums(){
			return implode(' ', $this->numeros);
		}
		
		function imprimir(){
			$str = implode(' ', $this->numeros);
			echo $str."<br>";
		}
	}
	
	$boletos = [];
	while(count($boletos) < 100){
		$boleto = new Boleto();
		if(!in_array($boleto->getNums(), $boletos)){
			array_push($boletos, $boleto->getNums());
			echo $boleto->getNums().'<br>';
		}
	}
?>