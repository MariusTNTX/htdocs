let app = angular.module("app",[]);

//Las directivas personalizadas se crean con "directive". Las mayúsculas del nombre se sustituirán en HTML por "-" y su minúscula
app.directive("backImg",()=>{
  // Recibe el scope para acceder a las variables del controlador (igual a $scope),
  // el elemento HTML de la directiva, y los atributos del elemento HTML
  return (scope,element,attrs)=>{
    // $observe ejecutará una función al recibir una directiva determinada indicada con el template de angular, 
    // por ejemplo con {{}}, ya que se ejecutará después de que angular haya sustituido la expresión por ese valor
    attrs.$observe('backImg',(value)=>{
      element.css({
        'background': 'url('+value+')',
        'background-size': 'cover',
        'background-position': 'center'
      });
    });
  }
});

/* MyAutocomplete pide una función link y debe devolverla en un objeto dentro del elemento link */
app.directive("myAutocomplete",()=>{
  function link(scope,element,attrs){
    $(element).autocomplete({
      /* Source contiene el contenido de la directiva en HTML */
      source: scope[attrs.myAutocomplete],
      /* Select contiene una función que se ejecuta cuando seleccionamos un elemento de la lista */
      select: function(ev,ui){
        ev.preventDefault();
        if(ui.item) scope.optionSelected(ui.item.value);
      }, 
      focus: function(ev,ui){
        ev.preventDefault();
        $(this).val(ui.item.label);
      }
    });
  };
  return {link: link};
});

app.controller("controller",($scope,$http)=>{
  $http.get("https://api.github.com/users/urielhdz/repos")
  .then(data=>{
    $scope.repos = data.data;
    $scope.repoNames = [];
    $scope.repos.forEach(repo => {$scope.repoNames.push(repo.name)});

    /* Se define la función que actualizará los repositorios visibles tras cada selección */
    $scope.optionSelected = function(data){
      $scope.$apply(()=>{
        $scope.main_repo = data;
      });
    }
  }).catch((err)=>console.log(err))
});