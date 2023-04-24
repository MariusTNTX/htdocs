angular.module("mainModule",[])

// Con run() se puede ejecutar codigo fuera de los controladores 
.run(($rootScope)=>{
  // Al hacer referencia a nombre desde html funciona porque ha quedado establecido en el scope padre
  $rootScope.nombre = "Codigo Facilito";
})

.controller("mainController",($scope)=>{
  // Si se cambia el valor de nombre desde el hijo, el valor final también cambiará
  $scope.nombre = "Mario";
})

// ChildController hereda todos los atributos de mainController al estar declarado de forma anidada
// El $scope del hijo se crea a partir de $scope del padre
.controller("childController",($scope)=> {

})