<?
	include_once("BBDD_Ej21.php");
	
	class Funciones extends BBDD{
		
		function __construct(){
			
		}
		
		//Devuelve true si hay empleados
		function hayEmpleados(){
			$arrayGuardados = getGuardados();
			if(count($arrayGuardados)>0) return true;
			else return false;
		}
		
		//Devuelve true si los campos introducidos son válidos
		function empleadoValido($nombre, $fechaAlt){
			$patron = '/[\d]{1,2}-[\d]{1,2}-[\d]{4}/';
			if(strlen($nombre)>0 && preg_match($patron,$fechaAlt)) return 1;
			else if(strlen($nombre)==0 && !preg_match($patron,$fechaAlt)) return 0;
			else if(strlen($nombre)==0) return -1;
			else return -2;
		}
		
		//Almacena un empleado nuevo
		function guardarEmpleado($nombre, $fechaAlt){
			$fAlta = new DateTime($fechaAlt); //Se crea el objeto fecha de alta
			//$fRen = new DateTime($fechaAlt)->add(new DateInterval("P6M")); 
			//Se crea otro objeto fecha 6 meses después
			$fRen = new DateTime(date(strtotime("first monday of next 6 months",$fAlta->getTimestamp()))); 
			$empleado = ['nombre'=>$nombre,'fechaAlta'=>$fAlta,'fechaRenov'=>$fRen];
			if(hayEmpleados()) array_push($arrayNuevos,$empleado);
			else $arrayNuevos[0] = $empleado;
			echo "FUNCION GUARDAR:<br>";
			echo "ARRAY GUARDADOS:<br>";
			?><pre><?=print_r($arrayGuardados)?></pre><?
			echo "NUEVO EMPLEADO:<br>";
			?><pre><?=print_r($empleado)?></pre><?
		}
		
		//Imprime una tabla con los empleados
		function mostrarEmpleados(){
			echo "<table><tr><th>NOMBRE</th><th>FECHA DE ALTA</th><th>FECHA DE RENOVACIÓN</th></tr>";
			foreach($arrayGuardados as $reg){
				echo '<tr><td>'.$reg['nombre'].'</td><td>'.$reg['fechaAlta'].'</td><td>'.$reg['fechaRenov'].'</td></tr>';
			}
			echo "</table>";
		}
		
		//Imprime la instancia del array de empleados
		function convertirArray(){
			$primero = false;
			echo '$arrayGuardados = [';
			foreach($arrayGuardados as $reg){
				if($primero) echo ",";
				$primero=true;
				echo 'new Array("nombre"=>"'.$reg['nombre'].'", "fechaAlta"=>"'.$reg['fechaAlta'].'", "fechaRenov"=>"'.$reg['fechaRenov'].'")';
			}
			echo "];";
		}
	}
	
?>