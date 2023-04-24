angular.module("mainModule",[])
.controller("mainController",($scope,$http)=>{
  $scope.posts = [];
  $scope.loading = true;
  $http.get("http://jsonplaceholder.typicode.com/posts")
    .then((data)=>{
      console.log(data.data);
      $scope.posts = data.data;
      $scope.loading = false;
    }).catch((err)=> $scope.loading = false);
});