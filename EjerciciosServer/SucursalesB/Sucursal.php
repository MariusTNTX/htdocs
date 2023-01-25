<?
	class Sucursal{
		
		static $saldo=5000;
		private $ventas;
		private $compras;
		
		function __construct(){
			$this->ventas=0;
			$this->compras=0;
		}
		function getVentas(){
			return $this->ventas;
		}
		function getCompras(){
			return $this->compras;
		}
		static function getSaldo(){
			return self::$saldo;
		}
		
		function comprar($cant){
			$this->compras += $cant;
			self::$saldo -= $cant;
		}
		function vender($cant){
			$this->ventas += $cant;
			self::$saldo += $cant;
		}
		function getTotal(){
			$total = $this->ventas - $this->compras;
			if($total > 0) return '+'.$total;
			return $total;
		}
	}
?>