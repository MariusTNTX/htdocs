/* function generarEnlaceDisc(disc){
  if(disc.length>0){
    let urlDisc = disc.trim().toLowerCase().replace(" ","_");
    document.getElementById("enlacePropDisc").innerHTML = `<a href="https://www.metal-archives.com/labels/${urlDisc}" target="_blank">Metallum - ${disc}</a>`;
  }
}

function addNewDiscografica(band, musico, id){
  //Provisional -----------
  musico.sexo = "";
  musico.imagen = "";
  musico.fechaNac = {dia: "", mes: "", anio: ""};
  musico.fechaDef = {dia: "", mes: "", anio: ""};
  musico.pais = "";
  musico.origen = "";
  console.log(musico)
  //-----------------------
  let tbodyMusicos = document.getElementById("tbodyMusicos");
  let txt = `
  <div class="col-12 col-md-6 col-xl-4 my-2">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title text-center">
          Nuevo Músico
          <button type="button" class="btn btn-danger ms-2 eliminarMus">x</button>
        </h5>
        <div class="more p-0 text-center mb-2">
          <button class="btn btn-primary btnGenPropMus a${id}" id="a${id}" data-bs-toggle="modal" data-bs-target="#musPropModal">Generar Propuesta</button>
        </div>
        <div class="card-text">
          <div class="row">
            <div class="col-6 my-1">
              <div class="form-floating">
                <input type="text" value="${musico.nombre}" class="form-control nombreMus a${id}" name="nombreMus[]" placeholder=".">
                <label for="nombreMus">Nombre</label>
              </div>
            </div>
            <div class="col-6 my-1">
              <select class="form-select py-3 a${id}" name="sexoMus[]" aria-label="Default select example">
                <option value="H" ${(musico.sexo=="H") ? "selected" : ""}>Hombre</option>
                <option value="M" ${(musico.sexo=="M") ? "selected" : ""}>Mujer</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-12 my-1">
              <div class="form-floating">
                <input type="text" value="${musico.imagen}" class="form-control imgMus a${id}" name="imgMus[]" placeholder=".">
                <label for="imgMus">Imagen</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 my-1">
              <p class="text-center fw-bold bg-transparent mb-0">Fecha de Nacimiento</p>
              <div class="row">
                <div class="col-4 form-floating pe-1">
                  <input type="number" value="${musico.fechaNac.dia}" class="form-control diaNacMus a${id}" name="diaNacMus[]" min="0" max="31" placeholder=".">
                  <label for="diaNacMus" class="ps-4">Día</label>
                </div>
                <div class="col-4 form-floating px-1">
                  <input type="number" value="${musico.fechaNac.mes}" class="form-control mesNacMus a${id}" name="mesNacMus[]" min="1" max="12" placeholder=".">
                  <label for="mesNacMus" class="ps-3">Mes</label>
                </div>
                <div class="col-4 form-floating ps-1">
                  <input type="number" value="${musico.fechaNac.anio}" class="form-control anioNacMus a${id}" name="anioNacMus[]" minlength="4" maxlength="4" placeholder=".">
                  <label for="anioNacMus" class="ps-3">Año</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 my-1">
              <p class="text-center fw-bold bg-transparent mb-0">Fecha de Defunción</p>
              <div class="row">
                <div class="col-4 form-floating pe-1">
                  <input type="number" value="${musico.fechaDef.dia}" class="form-control diaDefMus a${id}" name="diaDefMus[]" min="0" max="31" placeholder=".">
                  <label for="diaDefMus" class="ps-4">Día</label>
                </div>
                <div class="col-4 form-floating px-1">
                  <input type="number" value="${musico.fechaDef.mes}" class="form-control mesDefMus a${id}" name="mesDefMus[]" min="1" max="12" placeholder=".">
                  <label for="mesDefMus" class="ps-3">Mes</label>
                </div>
                <div class="col-4 form-floating ps-1">
                  <input type="number" value="${musico.fechaDef.anio}" class="form-control anioDefMus a${id}" name="anioDefMus[]" minlength="4" maxlength="4" placeholder=".">
                  <label for="anioDefMus" class="ps-3">Año</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 my-1">
              <div class="form-floating">
                <input type="text" value="${musico.pais}" class="form-control paisMus a${id}" name="paisMus[]" placeholder=".">
                <label for="paisMus">País</label>
              </div>
            </div>
            <div class="col-6 my-1">
              <div class="form-floating">
                <input type="text" value="${musico.origen}" class="form-control origenMus a${id}" name="origenMus[]" placeholder=".">
                <label for="origenMus">Origen</label>
              </div>
            </div>
          </div>
          <div class="row px-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col"><button type="button" class="btn btn-success addEtapaMusBan anadir">+</button></th>
                  <th scope="col">Año Inicio</th>
                  <th scope="col">Año Fin</th>
                </tr>
              </thead>
              <tbody class="table-group-divider tbodyEtapasMus a${id}">
                <tr>
                  <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                  <td><input type="number" value="${musico.anioInic}" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="${new Date().getFullYear()}"></td>
                  <td><input type="number" value="${musico.anioFin}" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="${new Date().getFullYear()}"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  tbodyMusicos.innerHTML+=txt;

  //Si hay mas de un musico con el mismo nombre se incluyen todas sus etapas
  if(band.musicos.filter(mus => mus.nombre==musico.nombre).length>1){ //band.musicos.some(mus => (mus.nombre==musico.nombre && mus.aparece))
    let body = document.querySelector(".tbodyEtapasMus a"+id);
    for(let mus of band.musicos.filter(mus => mus.nombre==musico.nombre)){
      body.innerHTML+=`
      <tr>
        <th><button type="button" class="btn btn-danger eliminar">x</button></th>
        <td><input type="number" value="${mus.anioInic}" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="${new Date().getFullYear()}"></td>
        <td><input type="number" value="${mus.anioFin}" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="${new Date().getFullYear()}"></td>
      </tr>`;
    }
  }

  // Generar Propuesta
  let btnGenPropMus = document.querySelectorAll(".card .btnGenPropMus");
  let idPropMus = document.getElementById("idPropMus");
  // Campos
  let nombreMus = document.querySelectorAll(".card .nombreMus");

  //BOTÓN PRE-MODAL GENERAR PROPUESTA MUSICO
  for(let btn of btnGenPropMus){
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      let id = e.target.id[1];
      idPropMus.innerHTML = id;
      generarEnlaceMus(nombreMus[id].value, band);
    });
  }
} */