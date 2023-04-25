let app = angular.module("ToDoListApp",["LocalStorageModule"]);

console.log("Aplicacion creada")

//Factory ejecuta una función que devuelve un objeto mientras que Service instancia un nuevo objeto
app.service('ToDoService',(localStorageService)=>{
  //Ya no es necesario crear el objeto, por lo que debemos usar "this"
  this.key = "angular-todolist";
  if(localStorageService.get(this.key)) this.activities = localStorageService.get(this.key);
  else this.activities = [];

  this.add = function(newActv){
    this.activities.push(newActv);
    this.updaLocalStorage();
  }
  this.updaLocalStorage = function(){
    localStorageService.set(this.key,this.activities);
  }
  this.clean = function(){
    this.activities = [];
    this.updaLocalStorage();
    return this.getAll();
  }
  this.getAll = function(){
    return this.activities;
  }
  this.removeItem = function(item){
    console.log(item)
    this.activities = this.activities.filter((activity)=>activity!==item);
    this.updaLocalStorage();
    return this.getAll();
  }
});

app.controller("ToDoListController",($scope, ToDoService)=>{
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
    $scope.todo = ToDoService.clean();
  };
});