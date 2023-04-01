let btnGenProp = document.getElementById("btnGenProp");
let btnBanProp = document.getElementById("btnBanProp");
let buscarBan = document.getElementById("buscarBan");
let banPropText = document.getElementById("banPropText");
let nombreBan = document.getElementById("nombreBan");
let tbodyEtapas = document.getElementById("tbodyEtapas");
let tbodyGeneros = document.getElementById("tbodyGeneros");
let tbodyTemas = document.getElementById("tbodyTemas");
let tbodyEstudios = document.getElementById("tbodyEstudios");
let tbodyDiscograficas = document.getElementById("tbodyDiscograficas");
let tbodyMusicos = document.getElementById("tbodyMusicos");
let tbodyAlbumes = document.getElementById("tbodyAlbumes");
let idPropMus = document.getElementById("idPropMus");
let idPropDisc = document.getElementById("idPropDisc");
let btnMusProp = document.getElementById("btnMusProp");
let btnDiscProp = document.getElementById("btnDiscProp");

var banda = {
  info: {
    nombre: "",
    pais: "",
    origen: "",
    escuchas: "",
    imagen: "",
    estatus: "",
    descrip: "",
    linkWeb: "",
    linkSpotify: ""
  },
  etapas: [{anioInic: 0, anioFin: 0, tipo: ""}],
  generos: [{nombre: "", estrellas: 0}],
  temasLetra: [{nombre: ""}],
  musicos: [],
  discograficas: [],
  estudios: []
};
var albumes = [
  {
    nombre: "",
    imagen: "",
    tipo: "",
    enLista: 1,
    anio: 0,
    mes: 0,
    dia: 0,
    escuchas: 0,
    descrip: "",
    duracion: 0,
    linkSpotify: "",
    linkAmazon: "",
    generos: [{nombre: "", estrellas: 0}],
    rolesMusicos: [{nombre: "", rol: ""}],
    discograficas: [{nombre: ""}],
    estudios: [{nombre: ""}],
    canciones: [{nombre:"", estrellas: 0}]
  }
];
let musicos = [{nombre: "",imagen: "",sexo: "",fechaNac: "",fechaDef: "",pais: "",origen: ""}];

function generarEnlace(){
  let banda = nombreBan.value;
  if(banda.length>0){
    let urlName = banda.trim().toLowerCase().replace(" ","_");
    document.getElementById("enlacePropBan").innerHTML = `<a href="https://www.metal-archives.com/bands/${urlName}" target="_blank">Metallum - ${banda}</a>`;
  }
}

function getPaisBanMA(txt){
  let index = txt.indexOf("Country of origin:");
  index = txt.indexOf("<dd>",index);
  if(txt.charAt(index+4)=="<") index = txt.indexOf(">",index+5)+1;
  else index += 4;
  document.getElementById("paisBan").value=txt.substring(index,txt.indexOf("<",index));
  return txt.substring(index,txt.indexOf("<",index));
}

function getOrigenBanMA(txt){
  let index = txt.indexOf("Location:");
  index = txt.indexOf("<dd>",index);
  if(txt.charAt(index+4)=="<") index = txt.indexOf(">",index+5)+1;
  else index += 4;
  document.getElementById("origenBan").value=txt.substring(index,txt.indexOf("<",index));
  return txt.substring(index,txt.indexOf("<",index));
}

function getImagenBanMA(txt){
  let index = txt.indexOf("band_img");
  index = txt.indexOf('<img src="',index)+10;
  document.getElementById("imagenBan").value=txt.substring(index,txt.indexOf('"',index));
  return txt.substring(index,txt.indexOf('"',index));
}

function getEstatusBanMA(txt){
  let index = txt.indexOf("Status:");
  index = txt.indexOf("<dd",index);
  index = txt.indexOf(">",index)+1;
  document.getElementById("estatusBan").value=txt.substring(index,txt.indexOf("<",index));
  return txt.substring(index,txt.indexOf("<",index));
}

function getWebBanMA(txt){
  let index = txt.search(/http.{1,50}\" title=\"Go to: Homepage\"/);
  document.getElementById("webBan").value=txt.substring(index,txt.indexOf('"',index));
  return txt.substring(index,txt.indexOf('"',index));
}

function getSpotifyBanMA(txt){
  let index = txt.search(/http.{1,100}\" title=\"Go to: Spotify\"/);
  document.getElementById("spotifyBan").value=txt.substring(index,txt.indexOf('"',index));
  return txt.substring(index,txt.indexOf('"',index));
}

function getEtapasBanMA(txt){ //PENDIENTE DETECTAR HIATOS
  let index = txt.indexOf("Years active:");
  index = txt.indexOf("<dd>",index)+4;
  let etapas = txt.substring(index,txt.indexOf("</dd>",index));
  etapas = etapas.split(",");
  etapas = etapas.filter(elm=>!elm.includes(" (as "));
  etapas = etapas.map(elm=>elm.trim().replace("\n",""));
  let result = [];
  for(let i=0; i<etapas.length; i++){
    result[i]={anioInic: etapas[i].split("-")[0], anioFin: etapas[i].split("-")[1], tipo: "ACTIVO"}
    if(result[i].anioFin == 'present') result[i].anioFin = "";
  }
  addEtapas(result);
  return result;
}

function getMusicosBanMA(txt){
  let result = [], busq=['id="band_tab_members_current','id="band_tab_members_past'], idx=0;
  //Leer Miembros Actuales y Pasados
  for(let bus of busq){
    let index = txt.lastIndexOf(bus);
    let lIndex = txt.indexOf("</tbody>",index);
    let txt1 = txt.substring(index,lIndex);
    index = 0;
    do{ //Leer lineupRows
      let link = "";
      index = txt1.indexOf('lineupRow',index)+11;
      index = txt1.indexOf('>',index)+2;
      let nombre=""; //Nombre
      if(txt1.substring(index,index+1)=="<"){
        index = txt1.indexOf("http",index);
        link = txt1.substring(index,txt1.indexOf('"',index));
        index = txt1.indexOf("artists/",index)+8;
        nombre = txt1.substring(index,txt1.indexOf("/",index)).replaceAll("_"," ");
        index = txt1.indexOf(">",index)+1;
      } else nombre = txt1.substring(index,txt1.indexOf("<",index));
      nombre = decodeURI(nombre);
      index = txt1.indexOf('<td>',index)+4;
      //Etapas
      let anios = txt1.substring(index,txt1.indexOf("</td>",index)).trim().split("&nbsp;")[1];
      anios = anios.substring(1,anios.length-1).split(", ");
      result[idx] = {nombre: nombre, link: link, etapas: [], aparece: false, musico: true};
      for(let anio of anios){
        let inic = anio.split("-")[0], fin="";
        if(anio.split("-")[1]) fin = anio.split("-")[1];
        else fin = anio.split("-")[0];
        if(fin == 'present') fin = "";
        result[idx].etapas.push({anioInic: inic, anioFin: fin});
      }
      idx++;
    } while(index <= txt1.lastIndexOf('lineupRow'));
  }
  return result;
}

function getTemasBanMA(txt){
  let result = [], index = txt.indexOf("Themes:");
  index = txt.indexOf("<dd>",index)+4;
  let temas = txt.substring(index,txt.indexOf("</dd>",index)).split(", ");
  for(let i=0; i<temas.length; i++) result[i] = {nombre: temas[i]};
  addTemasLetra(result);
  return result;
}

function addEtapas(etapas){
  tbodyEtapas.innerHTML="";
  for(let etapa of etapas){
    tbodyEtapas.innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="number" value="${etapa.anioInic}" class="form-control anioInicBan" name="anioInicEtaBan[]" min="1965" max="2023"></td>
      <td><input type="number" value="${etapa.anioFin}" class="form-control anioFinBan" name="anioFin[]" min="1965" max="2023"></td>
      <td><select class="form-select" name="tipoEtaBan[]" aria-label="Default select example">
          <option value="1">Activo</option>
          <option value="2">Hiato</option>
        </select>
      </td>
    </tr>`;
  }
}

/* function addGeneros(generos){
  tbodyGeneros.innerHTML="";
  for(let genero of generos){
    tbodyGeneros.innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input name="nombreGenBan[]" value="${genero.nombre}" class="form-control nombreGenBan" list="genlist"></td>
      <td><input name="estrellasGenBan[]" value="${genero.estrellas}" type="number" class="form-control estrellasGenBan" min="0" max="5" value="0"></td>
    </tr>`;
  }
} */

function addTemasLetra(temas){
  tbodyTemas.innerHTML="";
  for(let tema of temas){
    tbodyTemas.innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${tema.nombre}" class="form-control temaLetra" name="temaLetra[]"></td>
    </tr>`;
  }
}

function addAlbumes(albumes){
  tbodyAlbumes.innerHTML="";
  for(let i=0; i<albumes.length; i++) addNewAlbum(nombreBan.value,albumes[i],i);
}

//BOTÓN BUSCAR BANDA
buscarBan.addEventListener("click",(e)=>{
  e.preventDefault();
  if(nombreBan.value!=""){
    get("infoBanda",nombreBan.value).then(data => {
      console.log(data);
      //addGeneros(data.generos);
      addAlbumes(data.albumes);
      console.log(albumes);
    }).catch(error => alert("Error al recuperar información de la banda"));
  } else alert("Debes introducir una banda");
});

//BOTÓN PRE-MODAL GENERAR PROPUESTA BANDA
btnGenProp.addEventListener("click",(e)=>{
  e.preventDefault();
  generarEnlace();
});

//BOTÓN CARGAR PROPUESTA BANDA
btnBanProp.addEventListener("click",(e)=>{
  e.preventDefault();
  if(banPropText.value.length>0){
      let txt = banPropText.value;
      banda.info.nombre = nombreBan.value;
      banda.info.pais = getPaisBanMA(txt);
      banda.info.origen = getOrigenBanMA(txt);
      banda.info.imagen = getImagenBanMA(txt);
      banda.info.estatus = getEstatusBanMA(txt);
      banda.info.linkWeb = getWebBanMA(txt);
      banda.info.linkSpotify = getSpotifyBanMA(txt);
      banda.etapas = getEtapasBanMA(txt);
      banda.musicos = getMusicosBanMA(txt);
      banda.temasLetra = getTemasBanMA(txt);
      console.log(banda);
  } else alert("Debes incluir contenido HTML");
  banPropText.value="";
});

//BOTÓN CARGAR PROPUESTA MUSICO
btnMusProp.addEventListener("click",(e)=>{
  e.preventDefault();
  let musPropText = document.getElementById("musPropText");
  if(musPropText.value.length>0){
    let txt = musPropText.value;
    let id = idPropMus.textContent;
    let nomMus = document.querySelector(".nombreMus.a"+id).value;
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.sexo = getSexoMusMA(txt, id);}) //---
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.imagen = getImagenMusMA(txt, id);}) //---
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.fechaNac = getFechaNacMusMA(txt, id);}) //---
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.fechaDef = getFechaDefMusMA(txt, id);}) //---
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.pais = getPaisMusMA(txt, id);}) //---
    banda.musicos.map(mus=> {if(mus.nombre==nomMus) mus.origen = getOrigenMusMA(txt, id);}) //---
    console.log(banda);
    console.log(albumes);
  } else alert("Debes incluir contenido HTML");
  musPropText.value = "";
});

//BOTÓN CARGAR PROPUESTA DISCOGRÁFICA
btnDiscProp.addEventListener("click",(e)=>{
  e.preventDefault();
  let discPropText = document.getElementById("discPropText");
  if(discPropText.value.length>0){
    let txt = discPropText.value;
    let id = idPropDisc.textContent;
    banda.discograficas[id].estatus = getEstatusDiscMA(txt, id);
    banda.discograficas[id].imagen = getImagenDiscMA(txt, id);
    banda.discograficas[id].linkWeb = getWebDiscMA(txt, id);
    banda.discograficas[id].pais = getPaisDiscMA(txt, id);
    banda.discograficas[id].origen = getOrigenDiscMA(txt, id);
    console.log(banda);
    console.log(albumes);
  } else alert("Debes incluir contenido HTML");
  discPropText.value = "";
});