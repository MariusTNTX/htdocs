//Lista de elementos y Buscador
let filterButtons = document.querySelectorAll(".filterButton");
let searchButton = document.getElementById("searchButton");
//Filtros y Ordenación
let mainTitle = document.getElementById("mainTitle");
let estrictSearch = document.getElementById("estrictSearch");
let intervals = document.querySelectorAll(".interval");
let categories = document.querySelectorAll(".category");
let reductions = document.querySelectorAll(".reduction");
let order = document.getElementById("order");
let orderDirec = document.getElementById("orderDirec");
//Parámetros de búsqueda
let parameters = [];

//Gestionar Botones de la Lista Principal
filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    //Resalta únicamente el botón clicado
    filterButtons.forEach(b=>b.classList.remove("filter-active"));
    btn.classList.add("filter-active");
    //Impresión de los filtros del elemento
    switch(btn.textContent){
      case 'Álbumes': newFilter("albums");
        break;
      case 'Bandas': newFilter("bands");
        break;
      case 'Discográficas': newFilter("labels");
        break;
      case 'Músicos': newFilter("musicians");
        break;
      default: console.log("El elmento seleccionado de la lista no está contemplado");
    }
    //Actualización de valores de los filtros del elemento imprimido
    mainTitle = document.getElementById("mainTitle");
    intervals = document.querySelectorAll(".interval");
    categories = document.querySelectorAll(".category");
    reductions = document.querySelectorAll(".reduction");
  });
});

searchButton.addEventListener("click",()=>{
  //Título
  if(mainTitle.value.length>0 && !estrictSearch.checked){
    parameters.push([mainTitle.classList[1]+"_Like",mainTitle.value]);
  } else if(mainTitle.value.length>0 && estrictSearch.checked){
    parameters.push([mainTitle.classList[1],mainTitle.value]);
  }

  //Intervalos
  for(let intv of intervals){
    if(intv.value.length>0){
      parameters.push([intv.classList[1],intv.value]);
    }
  }

  //Categorias
  for(let cat of categories){
    if(cat.checked && parameters.some(p=>p[0]===cat.classList[1])){
      parameters.forEach(p=>{
        if(p[0]===cat.classList[1]) p[1]+="|"+cat.nextElementSibling.textContent;
      });
    } else if(cat.checked && !parameters.some(p=>p[0]===cat.classList[1])){
      parameters.push([cat.classList[1],cat.nextElementSibling.textContent]);
    }
  }

  //Reducciones
  for(let red of reductions){
    if(red.value.length>0){
      parameters.push([red.classList[1],red.value]);
    }
  }

  //Ordenación
  if(order.value.length>0){
    parameters.push(["order",order.value+orderDirec.value]);
  }

  console.log(parameters);

  //Obtención de Datos
  let result = list("albumes",true,...parameters);
  console.log(result);

});

