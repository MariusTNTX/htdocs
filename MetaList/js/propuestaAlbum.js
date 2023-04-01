function getFechaAlbMA(txt, id){
  let mes = {January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'};
  let index = txt.indexOf("Release date:");
  index = txt.indexOf("<dd>",index)+4;
  fecha = txt.substring(index,txt.indexOf("<",index)).trim();
  fecha = fecha.split(" ");
  if(fecha.length>2) fecha[1] = fecha[1].substring(0,fecha[1].length-3);
  if(fecha[1].length==1) fecha[1] = "0"+fecha[1];
  result = {dia: fecha[1], mes: mes[fecha[0]], anio: fecha[2]};
  document.querySelector(".diaAlb.a"+id).value=result.dia;
  document.querySelector(".mesAlb.a"+id).value=result.mes;
  document.querySelector(".anioAlb.a"+id).value=result.anio;
  return result;
}

function getTipoAlbMA(txt,id){
  let tipos = {full_length: "ESTUDIO", live_album: "LIVE", demo: "DEMO", Single: "SINGLE", ep: "EP", video: "VIDEO", boxed_set: "BOXSET", split: "SPLIT", compilation: "COMPILATION", collaboration: "COLLABORATION"};
  let index = txt.indexOf("Type:");
  index = txt.indexOf("<dd>",index)+4;
  let result = txt.substring(index,txt.indexOf("<",index)).trim().toLowerCase().replace(" ","_").replace("-","_");
  result = tipos[result];
  document.querySelector(".tipoAlb.a"+id).value=result;
  return result;
}

function getImagenAlbMA(txt, id){
  let index = txt.indexOf("album_img");
  index = txt.indexOf('<img src="',index)+10;
  document.querySelector(".imgAlb.a"+id).value=txt.substring(index,txt.indexOf('"',index));
  return txt.substring(index,txt.indexOf('"',index));
}

function getDuracionAlbMA(txt,id){
  let index = txt.indexOf("display table_lyrics");
  index = txt.indexOf('<strong>',index)+8;
  let result = txt.substring(index,txt.indexOf('</strong>',index));
  document.querySelector(".duracAlb.a"+id).value=result;
  return result;
}

function getDiscograficaAlbMA(txt,id){
  let index = txt.indexOf("Label:");
  index = txt.indexOf('<dd>',index)+4;
  let link="";
  if(txt.charAt(index)=="<"){
    index = txt.indexOf("http",index);
    link = txt.substring(index,txt.indexOf('"',index));
    index = txt.indexOf(">",index)+1;
  } 
  result = {nombre: txt.substring(index,txt.indexOf('<',index)), link: link};
  addDiscograficasAlb([result], id);
  return result;
}

function getMusicosAlbMA(txt,id){ //SACAR NOMBRE ORIGINAL DE LA URL
  let result = [];
  //MUSICOS
  let index = txt.lastIndexOf('id="album_members_lineup');
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
      nombre = decodeURI(nombre);
      index = txt1.indexOf(">",index)+1;
    } else {
      nombre = txt1.substring(index,txt1.indexOf("<",index));
      if(nombre.indexOf("(R.I.P.")>0) nombre = nombre.substring(0,nombre.indexOf("(R.I.P."));
    }
    index = txt1.indexOf('<td>',index)+4;
    //Roles
    let roles = txt1.substring(index,txt1.indexOf("</td>",index)).trim();
    do{ //Quitar Tracks
      if(roles.indexOf("(track")>0){
        let i1 = roles.indexOf("(track");
        let i2 = roles.indexOf(")",i1);
        roles = roles.substring(0,i1-1) + roles.substring(i2+1,roles.length);
      }
    } while(roles.indexOf("(track")>0);
    roles = roles.split(", ");
    roles = roles.filter(rol => (!rol.includes("Lyrics") && !rol.includes("Songwriting")));
    result.push({nombre: nombre, roles: roles.join("; "), link: link});
  } while(index <= txt1.lastIndexOf('lineupRow'));
  //PRODUCTORES
  index = txt.lastIndexOf('album_members_misc');
  lIndex = txt.indexOf("</tbody>",index);
  txt1 = txt.substring(index,lIndex);
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
      nombre = decodeURI(nombre);
      index = txt1.indexOf(">",index)+1;
    } else {
      nombre = txt1.substring(index,txt1.indexOf("<",index));
      //Quitar RIP
      if(nombre.indexOf("(R.I.P.")>0) nombre = nombre.substring(0,nombre.indexOf("(R.I.P."));
      if(nombre.includes(".")){ //Se corrigen nombres con iniciales
        nombre = nombre.substring(nombre.lastIndexOf(".")+1,nombre.length).trim();
        result.map(mus => {if(mus.nombre.includes(nombre)) nombre = mus.nombre;});
      } 
    }
    index = txt1.indexOf('<td>',index)+4;
    //Roles
    let roles = txt1.substring(index,txt1.indexOf("</td>",index)).trim();
    do{ //Quitar Tracks
      if(roles.indexOf("(track")>0){
        let i1 = roles.indexOf("(track");
        let i2 = roles.indexOf(")",i1);
        roles = roles.substring(0,i1-1) + roles.substring(i2+1,roles.length);
      }
    } while(roles.indexOf("(track")>0);
    if(roles.includes("Producer")){
      let incluido=false;
      result.map(mus => {if(mus.nombre.includes(nombre)){
        incluido=true;
        mus.roles+="; Producer";
      }});
      if(!incluido) result.push({nombre: nombre, roles: "Producer", link: link});
    }
  } while(index <= txt1.lastIndexOf('lineupRow'));
  addMusicosAlb(result, id);
  return result;
}

/* function getEstudiosAlbMA(txt,id){
  let index = txt.indexOf("Recording information:");
  index = txt.indexOf("<p",index);
  index = txt.indexOf(">",index)+1;
  let txt1 = txt.substring(index,txt.indexOf("</p>",index));
  index=0;
  let result = [];
  while(txt1.indexOf("at",index)>0){
    index = txt1.indexOf("at",index);
    result.push(txt1.substring(index+3,txt1.indexOf(" ",index+3)).replace(",",""));
    index++;
  }
  index=txt1.length;
  while(txt1.lastIndexOf("studio",index)>0){
    index = txt1.lastIndexOf("studio",index);
    result.push(txt1.substring(txt1.lastIndexOf(" ",index-2)+1,index-1));
    index--;
  }
  index=txt1.length;
  while(txt1.lastIndexOf("Studio",index)>0){
    index = txt1.lastIndexOf("Studio",index);
    result.push(txt1.substring(txt1.lastIndexOf(" ",index-2)+1,index-1));
    index--;
  }
  result = result.filter((item,index)=>result.indexOf(item) === index);
  for(let i=0; i<result.length; i++){
    result[i]={nombre: result[i], pais: "", origen:""};
  }
  addEstudioAlb(result, id);
  return result;
} */

function addTxtEstudiosAlbMA(txt, id){
  txtEst = "Éste álbum no cuenta con información sobre estudios de grabación.";
  if(txt.indexOf("Recording information:")>=0){
    let index = txt.indexOf("Recording information:");
    index = txt.indexOf("<p",index);
    index = txt.indexOf(">",index)+1;
    txtEst = txt.substring(index,txt.indexOf("</p>",index));
  }
  document.querySelector(".txtEstAlb.a"+id).innerHTML = formatTxtEstudiosAlb(txtEst);
}

function formatTxtEstudiosAlb(txt){
  txt = txt.replaceAll(" at "," <span class='text-primary fw-bold'>at</span> ");
  txt = txt.replaceAll(" studio"," <span class='text-danger fw-bold'>studio</span>");
  txt = txt.replaceAll(" Studio"," <span class='text-danger fw-bold'>Studio</span>");
  return txt;
}

//Botón Modal Añadir Estudio
document.getElementById("btnEstExtr").addEventListener("click",(e)=>{
  e.preventDefault();
  if(document.getElementById("estExtrInput").value.length>0){
    addEstudioAlb({nombre: document.getElementById("estExtrInput").value.trim(), pais: "", origen: ""}, document.getElementById("idExtrEst").innerHTML);
    document.getElementById("estExtrInput").value="";
  } else alert("Debes incluir el nombre de un estudio");
});

function addMusicosAlb(musicos,id){
  console.log("addMusicosAlb")
  console.log(musicos)
  let i=0;
  for(let mus of musicos){
    if(mus.roles!="Producer"){
      banda.musicos.map(musico => {if(musico.nombre==mus.nombre && !musico.aparece) addMusicoBan(musico, i);});
    } else if(banda.musicos.every(musico => musico.nombre!=mus.nombre)){
      banda.musicos.push({nombre: mus.nombre, link: mus.link, etapas: [], aparece: false, musico: false});
      addMusicoBan(banda.musicos[banda.musicos.length-1], i);
    }
    i++;
  }
  document.querySelector(".tbodyRolesAlb.a"+id).innerHTML="";
  for(let mus of musicos){
    document.querySelector(".tbodyRolesAlb.a"+id).innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${mus.nombre}" class="form-control musAlb a${id}" name="musAlb[]"></td>
      <td><input type="text" value="${mus.roles}" class="form-control rolesMusAlb a${id}" name="rolesMusAlb[]"></td>
    </tr>`;
  }
}

function addMusicoBan(mus, id){
  console.log("addMusicoBan")
  console.log(mus)
  //Imprimir Músico
  addNewMusico(banda, mus, id);
  banda.musicos.map(musico => {if(musico.nombre==mus.nombre) musico.aparece=true;});
}

function addDiscograficasAlb(discograficas,id){
  console.log("addDiscograficas")
  console.log(discograficas)
  console.log("length: "+discograficas.length)
  for(let i=0; i<discograficas.length; i++){
    if(banda.discograficas.length==0 || banda.discograficas.every(discog => discog.nombre!=discograficas[i].nombre)){
      console.log("addDiscograficasBan - id: "+banda.discograficas.length);
      addDiscograficaBan(discograficas[i], banda.discograficas.length);
    }
  }
  document.querySelector(".tbodyDiscograficasAlb.a"+id).innerHTML="";
  for(let disc of discograficas){
    document.querySelector(".tbodyDiscograficasAlb.a"+id).innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${disc.nombre}" class="form-control discAlb a${id}" name="discAlb[]"></td>
    </tr>`;
  }
}

function addDiscograficaBan(disc, id){
  console.log("addDiscograficaBan")
  console.log(disc)
  //Imprimir Discográfica
  addNewDiscografica(banda, disc, id);
  banda.discograficas.push({nombre: disc.nombre, imagen: "", estatus: "", pais: "", direccion: "", linkWeb: disc.link});
}

function addEstudioAlb(estudio, id){
  console.log("addEstudioAlb")
  console.log(estudio)
  //Si no está en la lista general se añade
  if(banda.estudios.length==0 || banda.estudios.every(estud => estud.nombre!=estudio.nombre)){
    addEstudioBan(estudio);
  }
  //Si no está en la lista específica de su álbum se añade
  if(albumes[id].estudios.every(estud => estud.nombre!=estudio.nombre)){
    albumes[id].estudios.push(estudio);
    document.querySelector(".tbodyEstudiosAlb.a"+id).innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${estudio.nombre}" class="form-control estAlb a${id}" name="estAlb[]"></td>
    </tr>`;
    console.log(albumes)
  }
}

function addEstudioBan(est){
  //Imprimir Estudios
  console.log("addEstudioBan")
  console.log(est)
  document.getElementById("tbodyEstudios").innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${est.nombre}" class="form-control nomEstBan" name="nomEstBan[]"></td>
      <td><input type="text" value="${est.pais}" class="form-control paisEstBan" name="paisEstBan[]"></td>
      <td><input type="text" value="${est.origen}" class="form-control origenEstBan" name="origenEstBan[]"></td>
    </tr>`;
  banda.estudios.push({nombre: est.nombre, pais: "", direccion: ""});
}

//BOTÓN CARGAR PROPUESTA ÁLBUM 
btnAlbProp.addEventListener("click",(e)=>{
  e.preventDefault();
  if(albPropText.value.length>0){
      let txt = albPropText.value;
      let id = idPropAlb.textContent;
      albumes[id].imagen = getImagenAlbMA(txt, id); //---
      let fecha = getFechaAlbMA(txt, id); //---
      albumes[id].anio = fecha.anio;
      albumes[id].mes = fecha.mes;
      albumes[id].dia = fecha.dia;
      albumes[id].tipo = getTipoAlbMA(txt, id); //---
      albumes[id].duracion = getDuracionAlbMA(txt, id); //---
      albumes[id].discograficas = getDiscograficaAlbMA(txt, id); //---
      albumes[id].musicos = getMusicosAlbMA(txt, id); //---
      addTxtEstudiosAlbMA(txt, id); //---
      console.log(banda);
      console.log(albumes);
  } else alert("Debes incluir contenido HTML");
  albPropText.value = "";
});