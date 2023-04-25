angular.module("ToDoListApp",["LocalStorageModule"])
//Con factory se crea un servicio definido dentro de una foncuión que devuelve un objeto
//Un servicio puede inyectar otro servicio, por lo que le podemos inyectar localStorageService

.factory('ToDoService',(localStorageService)=>{
  var toDoService = {};
  toDoService.key = "angular-todolist";
  if(localStorageService.get(toDoService.key)) toDoService.activities = localStorageService.get(toDoService.key);
  else toDoService.activities = [];

  toDoService.add = function(newActv){
    toDoService.activities.push(newActv);
    toDoService.updaLocalStorage();
  }
  //Es preferible actualizarlo así en vez de usar watchers, ya que son una mala práctica
  toDoService.updaLocalStorage = function(){
    localStorageService.set(toDoService.key,toDoService.activities);
  }
  toDoService.clean = function(){
    toDoService.activities = [];
    toDoService.updaLocalStorage();
    return toDoService.getAll();
  }
  toDoService.getAll = function(){
    return toDoService.activities;
  }
  toDoService.removeItem = function(item){
    console.log(item)
    toDoService.activities = toDoService.activities.filter((activity)=>activity!==item);
    toDoService.updaLocalStorage();
    return toDoService.getAll();
  }
  return toDoService;
})

.controller("ToDoListController",($scope, ToDoService)=>{
  $scope.todo = ToDoService.getAll();
  $scope.newActv = {};

  $scope.addActv = ()=>{
    ToDoService.add($scope.newActv);
    $scope.newActv = {};
  };

  $scope.removeActv = function(item){
    $scope.todo = ToDoService.removeItem(item);
  };

  $scope.cleanActv = function(){
    $scope.todo = ToDoService.clean()
  };
});