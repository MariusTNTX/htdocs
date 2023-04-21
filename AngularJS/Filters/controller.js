angular.module("mainModule",[])

  //Filtros: Se indica el nombre del filtro y una función SIN PARÁMETROS que ejecutará la función de filtrado
  .filter("removeHtml",()=>(texto)=>texto.replace(/<[^>]+>/gm,''))

  .controller("FiltersController",($scope)=>{
    $scope.mi_html = "<p>Hola Mundo</p>";
  });