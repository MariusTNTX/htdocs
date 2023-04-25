/* MÓDULO PRINCIPAL */
angular.module("FinalApp",['lumx','ngRoute'])

/* CONFIGURACIÓN DE RUTAS */
.config(function($routeProvider){
  $routeProvider
    .when("/",{
      controller: "MainController",
      templateUrl: "templates/home.html"
    })
})

/* CONTROLADORES */
.controller("MainController",function($scope){

});