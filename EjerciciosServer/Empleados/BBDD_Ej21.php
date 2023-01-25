<?
	class BBDD{
		
		//PROPIEDADES
		public $arrayGuardados;
		public $arrayNuevos;
		
		//CONSTRUCTOR
		function __construct(){
			$this->arrayGuardados[] = array("nombre"=>"Mario","fechaAlta"=>"26-10-2022","fechaRenov"=>"29-05-2023");
			$this->arrayGuardados[] = array("nombre"=>"Jesus","fechaAlta"=>"02-11-2022","fechaRenov"=>"08-05-2023");
			
			if(isset($_GET['nuevosEmpleados'])){ //Si hay empleados nuevos en la URL se almacenan:
				$this->arrayNuevos = unserialize(urldecode($_GET['nuevosEmpleados']));
			}
		}

		//GETTERS
		function getGuardados(){
			return $this->arrayGuardados;
		}
		function getNuevos(){
			return $this->arrayNuevos;
		}
		//SETTERS
		function setGuardados($vlr){
			$this->arrayGuardados=$vlr;
		}
		function setNuevos($vlr){
			$this->arrayNuevos=$vlr;
		}
		
		//Devuelve true si hay empleados:
		function hayGuardados(){
			return (isset($this->arrayGuardados));
		}
		function hayNuevos(){
			return (isset($this->arrayNuevos));
		}
		
		//Devuelve true si los campos introducidos son válidos
		function empleadoValido($nombre, $fechaAlt){
			$patron = '/[\d]{2}-[\d]{2}-[\d]{4}/';
			if(strlen($nombre)>0 && preg_match($patron,$fechaAlt)) return 1;
			if(strlen($nombre)==0 && !preg_match($patron,$fechaAlt)) return 0;
			if(strlen($nombre)==0) return -1;
			return -2;
		}
		
		//Almacena un empleado nuevo
		function guardarEmpleado($nombre, $fechaAlt){
			$fechaRen = new DateTime($fechaAlt);
			$fechaRen->add(new DateInterval("P6M"));
			if(date("l",$fechaRen->getTimestamp())!="Monday") $fechaRen->modify("next Monday");
			$this->arrayNuevos[] = array('nombre'=>$nombre,'fechaAlta'=>$fechaAlt,'fechaRenov'=>$fechaRen->format("d-m-Y"));
		}
		
		//Imprime una tabla con los empleados
		function mostrarEmpleados(){
			if($this->hayNuevos()) $listaEmple = array_merge($this->arrayGuardados,$this->arrayNuevos);
			else $listaEmple = $this->arrayGuardados;
			
			if($this->hayGuardados() || $this->hayNuevos()){
				echo "<br><br><br><table><tr><th>NOMBRE</th><th>FECHA DE ALTA</th><th>FECHA DE RENOVACIÓN</th></tr>";
				foreach($listaEmple as $reg){
					echo '<tr><td>'.$reg['nombre'].'</td><td>'.$reg['fechaAlta'].'</td><td>'.$reg['fechaRenov'].'</td></tr>';
				}
			}
			echo "</table>";
		}
		
		//Imprime la instancia del array de empleados
		function convertirArray(){
			echo "<br><br><br>";
			if($this->hayNuevos()){
				echo "<h2>Empleados Añadidos en la Sesión:</h2>";
				foreach($this->arrayNuevos as $reg){
					echo '$this->arrayGuardados[] = array(';
					echo '"nombre"=>"'.$reg['nombre'].'",';
					echo '"fechaAlta"=>"'.$reg['fechaAlta'].'",';
					echo '"fechaRenov"=>"'.$reg['fechaRenov'].'");<br>';
				}
			}
			
		}
	}
?>