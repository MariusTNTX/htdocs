/* Se añade la nueva dependencia LocalStorageModule procedente del JS descargado */
angular.module("ToDoListApp",["LocalStorageModule"])
/* Se inyecta la nueva dependencia localStorageService en el controlador principal */
.controller("ToDoListController",($scope, localStorageService)=>{
  /* Con el metodo get obtenemos el contenido de localstorage correspondiente al nombre indicado */
  if(localStorageService.get("angular-todolist")) $scope.todo = localStorageService.get("angular-todolist");
  else $scope.todo = [];
  $scope.newActividad = {};

  /* La función $watch ejecuta una función cada vez que el estado de un elemento dado cambie */
  /* $scope.$watch(()=>$scope.newActividad, (newValue,oldValue)=>{
    console.log(newValue);
    console.log(oldValue);
  }); */

  /* La función $watchCollection ejecuta una función cada vez que el estado del elemento de $scope indicado cambie */
  $scope.$watchCollection("todo", (newValue,oldValue)=>{
    /* Con el metodo set establecemos el contenido del localstorage correspondiente al nombre indicado */
    localStorageService.set("angular-todolist",$scope.todo);
  });

  $scope.addActividad = ()=>{
    $scope.todo.push($scope.newActividad);
    $scope.newActividad = {};
  };
});