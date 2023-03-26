function addBtnRem(btn){
  btn.addEventListener("click",()=>{
    let tbody = btn.parentElement.parentElement.parentElement;
    let fila = btn.parentElement.parentElement;
    tbody.removeChild(fila);
  });
}

function addBtnRemMus(tarj){
  let botonRemMus = tarj.querySelector(".eliminarMus");
  botonRemMus.addEventListener("click",()=>{
    let body = botonRemMus.parentElement.parentElement.parentElement.parentElement.parentElement;
    let card = botonRemMus.parentElement.parentElement.parentElement.parentElement;
    body.removeChild(card);
  });
}

function addBtnAdd(btn){
  btn.addEventListener("click",()=>{
    let tbody = btn.parentElement.parentElement.parentElement.nextElementSibling;
    if(btn.id=='addEtapaBan') tbody.innerHTML += fila.etapas;
    if(btn.id=='addGeneroBan') tbody.innerHTML += fila.generos;
    if(btn.id=='addTemaBan') tbody.innerHTML += fila.temas;
    if(btn.classList.contains("addEtapaMusBan")) tbody.innerHTML += fila.etapasMus;
    addBtnRem(tbody.lastChild.firstChild.firstChild);
  });
}

let fila = {
  etapas: `<tr><th><button type="button" class="btn btn-danger eliminar">x</button></th><td><input type="number" class="form-control anioInicBan" name="anioInicEtaBan[]" min="1965" max="2023" required></td><td><input type="number" class="form-control anioFinBan" name="anioFin[]" min="1965" max="2023"></td><td><select class="form-select" name="tipoEtaBan[]" aria-label="Default select example" required><option value="1">Activo</option><option value="2" selected>Inactivo</option><option value="3">Hiato</option></select></td></tr>`,
  generos: `<tr><th><button type="button" class="btn btn-danger eliminar">x</button></th><td><input name="nombreGenBan[]" class="form-control nombreGenBan" list="genlist" required></td><td><input name="estrellasGenBan[]" type="number" class="form-control estrellasGenBan" min="0" max="5" value="0" required></td></tr>`,
  temas: `<tr><th><button type="button" class="btn btn-danger eliminar">x</button></th><td><input type="text" class="form-control temaLetra" name="temaLetra[]"></td></tr>`,
  etapasMus: `<tr><th><button type="button" class="btn btn-danger eliminar">x</button></th><td><input type="number" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="2023"></td><td><input type="number" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="2023"></td></tr>`
}
let nuevoMusico = `<div class="col-12 col-md-6 col-xl-4 my-2"><div class="card"><div class="card-body"><h5 class="card-title text-center">Nuevo Músico<button type="button" class="btn btn-danger ms-2 eliminarMus">x</button></h5><div class="card-text"><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" class="form-control nombreMus" name="nombreMus[]" placeholder="." required><label for="nombreMus">Nombre</label></div></div><div class="col-6 my-1"><select class="form-select py-3" name="sexoMus[]" aria-label="Default select example"><option value="H" selected>Hombre</option><option value="M">Mujer</option></select></div></div><div class="row"><div class="col-6 my-1"><label for="fechaNacMus">Fecha Nacim.</label><input type="date" class="form-control fechaNacMus" name="fechaNacMus[]"></div><div class="col-6 my-1"><label for="fechaDefMus">Fecha Defunción</label><input type="date" class="form-control fechaDefMus" name="fechaDefMus[]"></div></div><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" class="form-control paisMus" name="paisMus[]" placeholder="." required><label for="paisMus">País</label></div></div><div class="col-6 my-1"><div class="form-floating"><input type="text" class="form-control origenMus" name="origenMus[]" placeholder="." required><label for="origenMus">Origen</label></div></div></div><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addEtapaMusBan anadir">+</button></th><th scope="col">Año Inicio</th><th scope="col">Año Fin</th></tr></thead><tbody class="table-group-divider"><tr><th><button type="button" class="btn btn-danger eliminar">x</button></th><td><input type="number" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="2023"></td><td><input type="number" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="2023"></td></tr></tbody></table></div></div></div></div></div>`;


//Botones Eliminar Fila
for(let botonRem of document.querySelectorAll(".eliminar")) addBtnRem(botonRem);

//Botones Añadir Fila
for(let botonAdd of document.querySelectorAll(".anadir")) addBtnAdd(botonAdd);

//Botón Añadir Tarjeta
let anadirMusico = document.getElementById("addMusicoBan");
anadirMusico.addEventListener("click",()=>{
  anadirMusico.parentElement.parentElement.innerHTML += nuevoMusico;
  let tarj = anadirMusico.parentElement.parentElement.lastChild.firstChild.firstChild;
  addBtnRemMus(tarj);
  addBtnAdd(tarj.querySelector(".addEtapaMusBan"));
  addBtnRem(tarj.querySelector(".eliminar"));
});
//Botón Eliminar Tarjeta
let botonRemMus = document.querySelector(".eliminarMus");
botonRemMus.addEventListener("click",()=>{
  let body = botonRemMus.parentElement.parentElement.parentElement.parentElement.parentElement;
  let card = botonRemMus.parentElement.parentElement.parentElement.parentElement;
  body.removeChild(card);
});