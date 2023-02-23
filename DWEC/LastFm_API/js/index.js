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
    for(let elm of relacElementos[elemento].ordenTrue){
      elm.classList.remove("d-none");
      elm.nextElementSibling.classList.remove("d-none");
    }
    for(let elm of relacElementos[elemento].ordenFalse){
      elm.classList.add("d-none");
      elm.nextElementSibling.classList.add("d-none");
    }
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

/* CLICK SOBRE BOTONES MÁS INFO */
let botonesInfo = document.querySelectorAll(".btnModalartist");
for(let btn of botonesInfo){
  btn.addEventListener("click",()=>{
    //Se genera el modal correspondiente
    //Se añade un listener a los botones X y cancelar para que se 
  });
}
