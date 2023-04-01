function generarEnlaceMus(musico){
  if(musico.length>0){
    let urlMusico = musico.trim().toLowerCase().replace(" ","_");
    document.getElementById("enlacePropMus").innerHTML = `<a href="https://www.metal-archives.com/artists/${urlMusico}" target="_blank">Metallum - ${musico}</a>`;
  }
}

function getSexoMusMA(txt, id){
  let index = txt.indexOf("Gender:");
  index = txt.indexOf('<dd>',index)+4;
  let genero = txt.substring(index,txt.indexOf('<',index));
  genero = (genero == "Female") ? "Mujer" : "Hombre";
  document.querySelector(".sexoMus.a"+id).setAttribute("value",genero);
  if(genero=="Hombre"){
    document.querySelector(".sexoMus.a"+id).children[1].removeAttribute("selected");
    document.querySelector(".sexoMus.a"+id).children[0].setAttribute("selected","true");
  } else {
    document.querySelector(".sexoMus.a"+id).children[0].removeAttribute("selected");
    document.querySelector(".sexoMus.a"+id).children[1].setAttribute("selected","true");
  }
  return genero;
}

function getImagenMusMA(txt, id){
  let index = txt.indexOf("member_img");
  index = txt.indexOf('<img src="',index)+10;
  document.querySelector(".imgMus.a"+id).setAttribute("value",txt.substring(index,txt.indexOf('"',index)));
  return txt.substring(index,txt.indexOf('"',index));
}

function getFechaNacMusMA(txt, id){
  let mes = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
  let index = txt.indexOf("Age:");
  index = txt.indexOf('<dd>',index)+4;
  let age = txt.substring(index,txt.indexOf("<",index)).trim();
  let result = {dia: "", mes: "", anio:""};
  if(age.includes("born")){
    age = age.substring(age.indexOf("(born")+6,age.lastIndexOf(")")).trim();
    if(age.length==4) result.anio=age;
    else {
      age = age.split(" ");
      if(age.length>2) age[1] = age[1].substring(0,age[1].length-3);
      if(age[1].length==1) age[1] = "0"+age[1];
      result = {dia: age[1], mes: mes[age[0]], anio: age[2]};
    }
  }
  document.querySelector(".diaNacMus.a"+id).setAttribute("value",result.dia);
  document.querySelector(".mesNacMus.a"+id).setAttribute("value",result.mes);
  document.querySelector(".anioNacMus.a"+id).setAttribute("value",result.anio);
  return result;
}

function getFechaDefMusMA(txt, id){
  let mes = {Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'};
  let result = {dia: "", mes: "", anio:""};
  if(txt.indexOf("R.I.P.:")!=-1){
    let index = txt.indexOf("R.I.P.:");
    index = txt.indexOf('<dd>',index)+4;
    let age = txt.substring(index,txt.indexOf("<",index)).trim();
    if(!age.includes("N/A")){
      if(age.length==4) result.anio=age;
      else {
        age = age.split(" ");
        if(age.length>2) age[1] = age[1].substring(0,age[1].length-3);
        if(age[1].length==1) age[1] = "0"+age[1];
        result = {dia: age[1], mes: mes[age[0]], anio: age[2]};
      }
    }
  }
  document.querySelector(".diaDefMus.a"+id).setAttribute("value",result.dia);
  document.querySelector(".mesDefMus.a"+id).setAttribute("value",result.mes);
  document.querySelector(".anioDefMus.a"+id).setAttribute("value",result.anio);
  return result;
}

function getPaisMusMA(txt, id){
  let index = txt.indexOf("Place of birth:");
  index = txt.indexOf('<dd>',index)+4;
  if(txt.charAt(index+1)=="<"){
    index = txt.indexOf(">",index)+1;
    document.querySelector(".paisMus.a"+id).setAttribute("value",txt.substring(index,txt.indexOf('<',index)));
    return txt.substring(index,txt.indexOf('<',index));
  } else return "";
}

function getOrigenMusMA(txt, id){
  let index = txt.indexOf("Place of birth:");
  index = txt.indexOf('<dd>',index)+4;
  let result = "";
  if(txt.charAt(index+1)=="<"){
    index = txt.indexOf("</a>",index)+4;
    if(txt.charAt(index+1)=='('){
      result = txt.substring(txt.indexOf("(",index)+1,txt.indexOf(")",index));
      document.querySelector(".origenMus.a"+id).setAttribute("value",result);
    }
  }
  return result;
}

function addNewMusico(band, musico, id){
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
              <select class="form-select py-3 sexoMus a${id}" name="sexoMus[]" aria-label="Default select example">
                <option value="Hombre" ${(musico.sexo=="Hombre") ? "selected" : ""}>Hombre</option>
                <option value="Mujer" ${(musico.sexo=="Mujer") ? "selected" : ""}>Mujer</option>
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
              <tbody class="table-group-divider tbodyEtapasMus a${id}">`;
        for(let etapa of musico.etapas){
          txt+=`<tr>
                  <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                  <td><input type="number" value="${etapa.anioInic}" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="${new Date().getFullYear()}"></td>
                  <td><input type="number" value="${etapa.anioFin}" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="${new Date().getFullYear()}"></td>
                </tr>`;
        }
        txt+=`</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  tbodyMusicos.innerHTML+=txt;

  /* Generar Propuesta */
  let btnGenPropMus = document.querySelectorAll(".card .btnGenPropMus");
  let idPropMus = document.getElementById("idPropMus");
  /* Campos */
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
}