var app = angular.module("MyFirstApp",[]);

//Dependencia $http: Permite un acceso mas facil a otras páginas mediante HTTP. Es muy usado para peticiones AJAX
app.controller("FirstController",($scope,$http)=>{
  $scope.posts = [];
  $scope.newPost = {};
  /* Método GET: permite recibir JSON tras la peticion a una URL dada */
  $http.get("http://jsonplaceholder.typicode.com/posts")
    .then((data)=>{
      console.log(data)
      $scope.posts = data.data;
    }).catch((err)=>{
      console.log(err)
    });
  $scope.addPost = ()=>{
    $http.post("http://jsonplaceholder.typicode.com/posts",{
      title: $scope.newPost.title,
      body: $scope.newPost.body,
      userId: 1
    }).then((data)=>{
      console.log(data,headers,config)
      $scope.posts.push($scope.newPost);
      $scope.newPost = {};
    }).catch((err)=>{
      console.log(err)
    });
  };
});