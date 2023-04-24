/* Se crea un modulo de angular. Un modulo se crea para ser reutilizado con un propósito, como gestionar los login.
Una vez creado se registra y puede ser referenciado con su nombre desde cualquier sitio. 
Parámetros: 
- Nombre 
- Lista de modulos (array) de los que va a depender 
  - ngResource: Crea objetos restfull que facilitan la comunicación con las API REST*/
var app = angular.module("MyFirstApp",[]);

//Se crea un controlador perteneciente al módulo que modificará los parámetros de $scope (ámbito)
//Pueden encadenarse con el angular.mode como angular.mode(...).controller(...).controller(...) etc.
//$scope se inyecta mediante "Dependency Injection"
//Si queremos conservar el nombre "$scope" debemos indicar como segundo parámetro ["$scope",(s)=>{}] en vez de ($scope)=>{}
//Se pueden inyectar varias dependencias así: ["$scope","$http",(s, h)=>{}]
app.controller("FirstController",["$scope","$http",(s, h)=>{
  s.nombre = "Mario";
  s.nuevoComentario = {};
  s.comentarios = [
    {comentario: "Buenos días", user: "JesuSaurom"},
    {comentario: "Hola :D", user: "MariusTNTX"}
  ];
  s.agregarComentario = ()=>{
    s.comentarios.push(s.nuevoComentario);
    s.nuevoComentario = {};
  }
}]);