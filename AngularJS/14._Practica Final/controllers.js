angular.module("FinalApp")

/* CONTROLADORES */
/* $resource permite establecer una dirección a la que se le pueden insertar parámetros para consumir API REST */
.controller("MainController",function($scope,$resource,PostResource){
  User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id: "@id"});
  $scope.posts = PostResource.query();
  $scope.users = User.query();
  // query() -> GET /posts -> Un array de posts -> isArray: true
  $scope.removePost = function(post){
    PostResource.delete({id: post.id}, function(data){ //Se envía una petición DELETE con el id
      console.log(data)
    });
    $scope.posts = $scope.posts.filter((elm)=>elm.id!==post.id);
  }
})

.controller("PostController",function($scope, PostResource, $routeParams, $location){
  $scope.title = "Editar Post";
  $scope.post = PostResource.get({id: $routeParams.id}); //Devuelve un JSON
  $scope.savePost = function(){
    PostResource.update({id: $scope.post.id},{data: $scope.post},function(data){
      console.log(data);
    });
    console.log($scope.post);
    $location.path("/post/"+$scope.post.id);
  }
})

.controller("NewPostController",function($scope, PostResource, $location){
  $scope.post = {};
  $scope.title = "Crear Post";
  $scope.savePost = function(){
    PostResource.save({data: $scope.post},function(data){
      console.log(data);
    });
    console.log($scope.post);
    $location.path("/");
  }
})