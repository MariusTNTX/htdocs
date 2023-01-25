<?
	class Sucursal{
		
		//static public $saldo=5000;
		private $ventas;
		private $compras;
		
		function __construct(){
			//$this->saldo=5000;
			$this->ventas=0;
			$this->compras=0;
		}
		/*function getSaldo(){
			return self::$saldo;
		}*/
		function getVentas(){
			return $this->ventas;
		}
		function getCompras(){
			return $this->compras;
		}
		function comprar($cant){
			$this->compras += $cant;
			//self::$saldo -= $cant;
		}
		function vender($cant){
			$this->ventas += $cant;
			//self::$saldo += $cant;
		}
		function getTotal(){
			$total = $this->ventas - $this->compras;
			if($total > 0) return '+'.$total;
			return $total;
		}
	}
?>