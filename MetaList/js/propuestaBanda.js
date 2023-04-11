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
var musicos = [{nombre: "",imagen: "",sexo: "",fechaNac: "",fechaDef: "",pais: "",origen: ""}], idMusico=0, descripcion=[], tradAllowed=true, auxTradAllowed=false; 

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
  let estatus = txt.substring(index,txt.indexOf("<",index)).trim();
  if(estatus == 'On hold') estatus = "En Hiato";
  else if(estatus == 'Split-up') estatus = "Disueltos";
  else estatus = "En Activo";
  document.getElementById("estatusBan").value = estatus;
  return estatus;
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
    result[i]={anioInic: etapas[i].split("-")[0], anioFin: etapas[i].split("-")[1], tipo: "En Activo"}
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
      let roles = txt1.substring(index,txt1.indexOf("</td>",index)).trim();
      let anios = [];
      while(roles.search(/(\(19)|(\(20)/)!=-1){
        let i = roles.search(/(\(19)|(\(20)/);
        let res = roles.substring(i+1,roles.indexOf(")",i)).replaceAll("present","3000").split(", ");
        for(let a of res) anios.push(a.split("-"));
        roles = roles.substring(roles.indexOf(")",i)+1,roles.length);
      }
      anios = anios.sort();
      for(let i=0; i<anios.length; i++){
        if(i+1<anios.length && anios[i+1][0]>=anios[i][0] && anios[i+1][0]<=anios[i][1]) anios[i]=undefined;
        else if(anios[i][1]==3000) anios[i][1]="";
      }
      anios = anios.filter(a => a!=undefined);
      result[idx] = {nombre: nombre, link: link, etapas: [], aparece: false, musico: true};
      for(let anio of anios) result[idx].etapas.push({anioInic: anio[0], anioFin: anio[1]});
      //Si es un miembro pasado con año de fin vacío sigifica que esa etapa acabó el mismo año
      if(bus=='id="band_tab_members_past'){
        for(let i=0; i<result[idx].etapas.length; i++){
          if(result[idx].etapas[i].anioFin==undefined) result[idx].etapas[i].anioFin = result[idx].etapas[i].anioInic;
        }
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
    let elm = document.createElement("tr");
    elm.innerHTML=`
      <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
      <td><input type="number" value="${etapa.anioInic}" class="form-control anioInicBan" name="anioInicEtaBan[]" min="1965" max="2023"></td>
      <td><input type="number" value="${etapa.anioFin}" class="form-control anioFinBan" name="anioFin[]" min="1965" max="2023"></td>
      <td><select class="form-select tipoEtaBan" name="tipoEtaBan[]" aria-label="Default select example">
          <option value="En Activo">Activo</option>
          <option value="En Hiato">Hiato</option>
        </select>
      </td>`;
    elm.querySelector(".eliminar-fila").addEventListener("click",(e)=>delFila(e.target));
    tbodyEtapas.appendChild(elm);
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
  tbodyTemas.innerHTML="", i=0;
  for(let tema of temas){
    let elm = document.createElement("tr");
    elm.innerHTML=`
      <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
      <td><input type="text" value="${tema.nombre}" class="form-control temaLetra t${i}" name="temaLetra[]"></td>`;
    i++;
    elm.querySelector(".eliminar-fila").addEventListener("click",(e)=>delFila(e.target));
    tbodyTemas.appendChild(elm);
  }
}

function addAlbumes(albumes){
  tbodyAlbumes.innerHTML="";
  for(let i=0; i<albumes.length; i++) addNewAlbum(nombreBan.value,albumes[i],i);
}

async function traducir(txt, descrip=false){
  let response = await fetch(`https://api.mymemory.translated.net/get?q=${txt}&langpair=en|es`);
  response = await response.json();
  if(descrip && !response.responseData.translatedText.includes("MAX ALLOWED QUERY")) descripcion.push(response.responseData.translatedText);
  return Promise.resolve(response);
}

function traducirInfoBanda(pais, origen, temas){
  let txt = pais+"_-_"+origen;
  for(let tema of temas){
    txt += "_-_"+tema.nombre;
  }
  console.log("Traducir:")
  console.log(txt);
  if(tradAllowed && auxTradAllowed){
    console.log("tradAllowed")
    traducir(txt).then(data => {
      console.log("traducir(txt)")
      if(!data.responseData.translatedText.includes("MYMEMORY WARNING")){
        console.log("No incluye warning")
        txt = data.responseData.translatedText.split("_-_");
        console.log("Texto extraido")
        banda.info.pais = txt.shift().replaceAll("temprano","antes").replaceAll("tarde","después");
        document.getElementById("paisBan").value = banda.info.pais;
        console.log("pais inroducido")
        banda.info.origen = txt.shift();
        document.getElementById("origenBan").value = banda.info.origen;
        console.log("origen inroducido")
        banda.temasLetra = [];
        for(let i=0; i<txt.length; i++){
          banda.temasLetra.push({nombre: txt[i]});
          document.querySelector(".temaLetra.t"+i).value=txt[i];
        }
        console.log("origen inroducido")
      } else {
        alert("Se ha superado el límite de traducciones diario, inténtalo de nuevo dentro de 24 horas");
        tradAllowed = false;
      } 
    }).catch(error => alert("Error en la tradución de información básica de la banda"));
  }
}

async function traducirDescrip(txt, target){
  console.log("traducirDescrip")
  console.log(txt)
  console.log(target)
  descripcion = [];
  txt = txt.replaceAll("#","Nº");
  for(let bus of ["Full Wikipedia article:","Current members:","Members:","<a href"]){
    index = txt.indexOf(bus);
    if(index!=-1) txt = txt.substring(0,index-1);
  }
  target.innerHTML = txt;
  txt = txt.trim().split(". ").filter(t=>t.length<500);
  console.log(txt);
  for(let i=0; i<txt.length; i++){
    if(i+1<txt.length && txt[i].length+txt[i+1].length<500){
      txt[i] += ". "+txt[i+1];
      txt.splice(i+1, 1);
      i--;
    }
  }
  console.log(txt);
  if(tradAllowed){
    for(let i=0; i<txt.length; i++){
      await traducir(txt[i],true);
      console.log(txt[i])
    }
    console.log(descripcion)
    descripcion = descripcion.join(" ");
    if(descripcion.includes("MYMEMORY WARNING")){
      alert("Se ha superado el límite de traducciones diario, inténtalo de nuevo dentro de 24 horas");
      tradAllowed = false;
    } else target.innerHTML = descripcion;
  }
}

async function traducirPaisOrigen(tipo, id, pais, origen, target1, target2){
  console.log("traducirPaisOrigen")
  console.log(pais)
  console.log(target1)
  console.log(origen)
  console.log(target2)
  target1.value = pais;
  target2.value = origen;
  let txt = pais+"; "+origen;
  if(tradAllowed && auxTradAllowed){
    await traducir(txt).then(data => data.responseData.translatedText).then(data=>{
      if(!data.includes("MYMEMORY WARNING")){
        pais = data.split("; ")[0];
        target1.setAttribute("value",pais);
        origen = data.split("; ")[1];
        target2.setAttribute("value",origen);
      } else {
        alert("Se ha superado el límite de traducciones diario, inténtalo de nuevo dentro de 24 horas");
        tradAllowed=false;
      }
    });
  }
  if(tipo=="mus") {
    banda.musicos.map(mus=> {if(mus.nombre==id) mus.pais = pais});
    banda.musicos.map(mus=> {if(mus.nombre==id) mus.origen = origen});
  } else {
    banda.discograficas[id].pais = pais;
    banda.discograficas[id].origen = origen;
  }
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
      if(getWebBanMA(txt)=="<html xmlns=" && getSpotifyBanMA(txt)=="<html xmlns="){
        document.getElementById("webBan").value="";
        document.getElementById("spotifyBan").value="";
        alert("Debes hacer clic en \"Related Links\" para poder obtener los links");
      } else {
        banda.info.nombre = nombreBan.value;
        banda.info.imagen = getImagenBanMA(txt);
        banda.info.estatus = getEstatusBanMA(txt);
        banda.info.linkWeb = getWebBanMA(txt);
        banda.info.linkSpotify = getSpotifyBanMA(txt);
        banda.etapas = getEtapasBanMA(txt);
        banda.musicos = getMusicosBanMA(txt);
        banda.info.pais = getPaisBanMA(txt);
        banda.info.origen = getOrigenBanMA(txt);
        banda.temasLetra = getTemasBanMA(txt);
        traducirInfoBanda(getPaisBanMA(txt), getOrigenBanMA(txt), getTemasBanMA(txt));
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${banda.info.nombre}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`)
          .then(data=>data.json())
          .then(data=>traducirDescrip(data.artist.bio.content, document.getElementById("descripcBan")))
          .catch(error=>alert("Error en la traducción de la descripción de la banda"));
        console.log(banda);
      }
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
    traducirPaisOrigen("mus", nomMus, getPaisMusMA(txt, id), getOrigenMusMA(txt, id), document.querySelector(".paisMus.a"+id), document.querySelector(".origenMus.a"+id));
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
    traducirPaisOrigen("disc", id, getPaisDiscMA(txt, id), getOrigenDiscMA(txt, id), document.querySelector(".paisDisc.a"+id), document.querySelector(".direcDisc.a"+id));
    console.log(banda);
    console.log(albumes);
  } else alert("Debes incluir contenido HTML");
  discPropText.value = "";
});