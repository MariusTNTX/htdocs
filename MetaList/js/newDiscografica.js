function generarEnlaceDisc(disc){
  let link = "";
  banda.discograficas.map(dis=>{if(dis.nombre==disc) link = dis.linkWeb;});
  if(link.length>0){
    document.getElementById("enlacePropDisc").innerHTML = `<a href="${link}" target="_blank">Metallum - ${disc}</a>`;
  }
}

function getEstatusDiscMA(txt, id){
  let index = txt.indexOf("Status:");
  index = txt.indexOf('<dd>',index)+4;
  index = txt.indexOf('>',index)+1;
  let estatus = txt.substring(index,txt.indexOf('<',index));
  estatus = (estatus == "active") ? "active" : "inactive";
  if(estatus=="active"){
    document.querySelector(".estatusDisc.a"+id).children[1].removeAttribute("selected");
    document.querySelector(".estatusDisc.a"+id).children[0].setAttribute("selected","true");
  } else {
    document.querySelector(".estatusDisc.a"+id).children[0].removeAttribute("selected");
    document.querySelector(".estatusDisc.a"+id).children[1].setAttribute("selected","true");
  }
  return estatus;
}

function getImagenDiscMA(txt, id){
  let index = txt.indexOf("label_img");
  index = txt.indexOf('<img src="',index)+10;
  document.querySelector(".imgDisc.a"+id).setAttribute("value",txt.substring(index,txt.indexOf('"',index)));
  return txt.substring(index,txt.indexOf('"',index));
}

function getWebDiscMA(txt, id){
  let result = "";
  if(txt.indexOf('id="label_contact"')!=-1){
    let index = txt.indexOf('id="label_contact"')+20;
    if(index == txt.indexOf('<a href=',index)){
      index = txt.indexOf('<a href=',index)+9;
      result = txt.substring(index,txt.indexOf('"',index));
    }
  }
  document.querySelector(".webDisc.a"+id).setAttribute("value",result);
  return result;
}

function getPaisDiscMA(txt, id){
  let index = txt.indexOf("Country:");
  index = txt.indexOf('<dd>',index)+4;
  if(txt.charAt(index)=="<"){
    index = txt.indexOf(">",index)+1;
    document.querySelector(".paisDisc.a"+id).setAttribute("value",txt.substring(index,txt.indexOf('<',index)));
    return txt.substring(index,txt.indexOf('<',index));
  } else return "";
}

function getOrigenDiscMA(txt, id){
  let index = txt.indexOf("Address:");
  index = txt.indexOf('<dd>',index)+4;
  let result = "", origen = txt.substring(index,txt.indexOf("</dd>",index));
  if(!origen.includes("N/A")){
    if(origen.includes("<br>")){
      origen = origen.split("<br>");
      result = origen[0].trim()+", "+origen[1].trim();
    } else result = origen.trim();
  }
  document.querySelector(".direcDisc.a"+id).setAttribute("value",result);
  return result;
}

function addNewDiscografica(band, discografica, id){
  console.log("addNewDiscografica - id: "+id)
  //Provisional -----------
  discografica.direccion = "";
  discografica.imagen = "";
  discografica.estatus = "";
  discografica.pais = "";
  discografica.linkWeb = "";
  console.log(discografica)
  //-----------------------
  let tbodyDiscograficas = document.getElementById("tbodyDiscograficas");
  let elm = document.createElement("div");
  elm.classList.add("a"+id,"etiqueta","discografica","col-12","col-md-6","col-xl-4","my-2");
  let txt = `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title text-center">
        <span class="text-dark">Nueva Discográfica</span>
        <button type="button" class="a${id} btn btn-danger ms-2 eliminar eliminar-etiqueta eliminarDisc">x</button>
      </h5>
      <div class="more p-0 text-center mb-2">
        <button class="btn btn-primary btnGenPropDisc a${id}" id="a${id}" data-bs-toggle="modal" data-bs-target="#discPropModal">Generar Propuesta</button>
      </div>
      <div class="card-text">
        <div class="row">
          <div class="col-6 my-1">
            <div class="form-floating">
              <input type="text" value="${discografica.nombre}" class="form-control nombreDisc a${id}" name="nombreDisc[]" placeholder=".">
              <label for="nombreDisc">Nombre</label>
            </div>
          </div>
          <div class="col-6 my-1">
            <select class="form-select py-3 estatusDisc a${id}" name="estatusDisc[]" aria-label="Default select example">
              <option value="active" ${(discografica.estatus=='active') ? "selected" : ""}>En Activo</option>
              <option value="inactive" ${(discografica.estatus!='active') ? "selected" : ""}>Inactivo</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-12 my-1">
            <div class="form-floating">
              <input type="text" value="${discografica.imagen}" class="form-control imgDisc a${id}" name="imgDisc[]" placeholder=".">
              <label for="imgDisc">Imagen</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 my-1">
            <div class="form-floating">
              <input type="text" value="${discografica.linkWeb}" class="form-control webDisc a${id}" name="webDisc[]" placeholder=".">
              <label for="webDisc">Página Web</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 my-1">
            <div class="form-floating">
              <input type="text" value="${discografica.pais}" class="form-control paisDisc a${id}" name="paisDisc[]" placeholder=".">
              <label for="paisDisc">País</label>
            </div>
          </div>
          <div class="col-6 my-1">
            <div class="form-floating">
              <input type="text" value="${discografica.direccion}" class="form-control direcDisc a${id}" name="direcDisc[]" placeholder=".">
              <label for="direcDisc">Dirección</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  elm.innerHTML = txt;

  // Generar Propuesta
  let btnGenPropDisc = elm.querySelector(".btnGenPropDisc");
  let idPropDisc = document.getElementById("idPropDisc");
  // Campos
  let nombreDisc = elm.querySelector(".nombreDisc");

  //BOTÓN PRE-MODAL GENERAR PROPUESTA DISCOGRÁFICA
  btnGenPropDisc.addEventListener("click",(e)=>{
    e.preventDefault();
    let id = e.target.id.substring(1);
    idPropDisc.innerHTML = id;
    generarEnlaceDisc(nombreDisc.value);
  });

  tbodyDiscograficas.appendChild(elm);
}