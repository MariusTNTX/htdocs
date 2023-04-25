let app = angular.module("app",[]);

app.controller("controller",($scope,$http)=>{
  $http.get("https://api.github.com/users/urielhdz/repos")
  .then(data=>{
    $scope.repos = data.data;
    console.log(data)
  })
  .catch((err)=>console.log(err))
});