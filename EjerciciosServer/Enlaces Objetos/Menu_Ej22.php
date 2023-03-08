<?
	class Menu{
		
		//PROPIEDADES
		public $enlacesGuardados;
		public $enlacesNuevos;
		
		//CONSTRUCTOR
		function __construct(){
			$this->enlacesGuardados[] = "as.com";
			$this->enlacesGuardados[] = "renfe.com";
			$this->enlacesGuardados[] = "marca.com";
			$this->enlacesGuardados[] = "php.net";
			
			if(isset($_GET['nuevosEnlaces'])){ //Si hay enlaces nuevos en la URL se almacenan:
				$this->enlacesNuevos = unserialize(urldecode($_GET['nuevosEnlaces']));
			}
		}

		//GETTERS
		function getGuardados(){
			return $this->enlacesGuardados;
		}
		function getNuevos(){
			return $this->enlacesNuevos;
		}
		//SETTERS
		function setGuardados($vlr){
			$this->enlacesGuardados=$vlr;
		}
		function setNuevos($vlr){
			$this->enlacesNuevos=$vlr;
		}
		
		//Devuelve true si hay empleados:
		function hayGuardados(){
			return (isset($this->enlacesGuardados));
		}
		function hayNuevos(){
			return (isset($this->enlacesNuevos));
		}
		
		//Devuelve true si los campos introducidos son válidos
		function enlaceValido($enlace){
			$patron = '/[\w]{2,}[.]{1}(es|com|net)/'; //Caracter alfanumerico + . + es/com/net
			return (strlen($enlace)>0 && preg_match($patron,$enlace));
		}
		
		//Almacena un empleado nuevo
		function guardarEnlace($enlace){
			$this->enlacesNuevos[] = $enlace;
		}
		
		//Imprime una tabla con los empleados
		function mostrar($dispos){
			if($this->hayNuevos()) $listaEnlaces = array_merge($this->enlacesGuardados,$this->enlacesNuevos);
			else $listaEnlaces = $this->enlacesGuardados;
			echo "<br><br><br><div>";
			if($dispos == "Mostrar en Vertical"){
				foreach($listaEnlaces as $enl){
					echo '<p class="vertic"><a href="http://www.'.$enl.'">www.'.$enl.'</a></p>';
				}
			} else {
				foreach($listaEnlaces as $enl){
					echo '<div class="horiz"><a href="http://www.'.$enl.'">www.'.$enl.'</a></div>';
				}
			}
			echo "</div>";
		}
		
		//Imprime la instancia del array de empleados
		function convertirArray(){
			echo "<br><br><br>";
			if($this->hayNuevos()){
				echo "<h2>Enlaces Añadidos en la Sesión:</h2>";
				foreach($this->enlacesNuevos as $enl){
					echo '$this->enlacesGuardados[] = "'.$enl.'";<br>';
				}
			}
		}
	}
?>