/* ESTADOS */
let elemento = "";

/* CLICK SOBRE ELEMENTOS */
//Se almacena el elemento a buscar clicado
elementos.addEventListener("click",(e)=>{
  if(e.target.nodeName=='INPUT'){
    //Se almacena el elmento clicado
    elemento=e.target.id;
    //Se habilitan solo las opciones correspondientes al elemento seleccionado
    for(let elm of relacElementos[elemento].filtrosTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[elemento].filtrosFalse) elm.classList.add("d-none");
    for(let elm of relacElementos[elemento].ordenTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[elemento].ordenFalse) elm.classList.add("d-none");
  }
});

/* CLICK SOBRE BOTÓN BUSCAR */
//Se realiza la búsqueda según los parámetros introducidos al darle a buscar
botonBuscar.addEventListener("click",()=>{
  switch(elemento){
    case 'artistas': printArtists();
      break;
    case 'albumes': console.log(window.location="view-source:" + 'https://www.last.fm/music/Megadeth');
      break;
    case '': console.error("Variable 'elemento' vacía");
      break;
  }
});

/* CLICK SOBRE BOTONES FILTRAR, ORDENAR Y ORDEN */
//Se cambia el contenido del drop según la opción seleccionada
for (let dropli of document.querySelectorAll(".dropli")){
  dropli.addEventListener("click",(e)=>{
    let boton = e.currentTarget.parentElement.previousElementSibling, li = e.target;
    if(li.textContent != 'Ninguno') boton.textContent = e.target.textContent;
    else if(boton.id=='filtrarpor') boton.textContent = 'Filtrar por';
    else if(boton.id=='ordenarpor') boton.textContent = 'Ordenar por';
  });
}



