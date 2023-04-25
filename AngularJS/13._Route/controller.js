let app = angular.module("app",['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    .when("/",{
      controller: "controller",
      templateUrl: "templates/home.html"
    })
    .when("/repo/:name",{
      controller: "RepoController",
      templateUrl: "templates/repo.html"
    })
    .otherwise("/"); //Si no existe la ruta dirige al home
});

app.directive("backImg",function(){
  return function(scope,element,attrs){
    attrs.$observe('backImg',function(value){
      element.css({
        'background': 'url('+value+')',
        'background-size': 'cover',
        'background-position': 'center'
      });
    });
  }
});

app.controller("controller",function($scope,$http){
  $http.get("https://api.github.com/users/twitter/repos")
  .then(function(data){
    $scope.repos = data.data;
    console.log(data)
  }).catch(function(err){console.log(err)})
});

//Se le inyecta routeParams para acceder a los parámetros de la url (":")
app.controller("RepoController",function($scope,$http,$routeParams){
  $scope.repo = {};
  //Se compone la URL con el parámetro name
  $http.get("https://api.github.com/repos/twitter/"+$routeParams.name)
  .then(function(data){
    $scope.repo = data.data;
    console.log(data)
  }).catch(function(err){console.log(err)})
});