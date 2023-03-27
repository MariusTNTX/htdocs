function getFechaAlbMA(txt, id){
  let mes = {January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'};
  let index = txt.indexOf("Release date:");
  index = txt.indexOf("<dd>",index)+4;
  fecha = txt.substring(index,txt.indexOf("<",index)).trim();
  fecha = fecha.replace("th,","").split(" ");
  result = {dia: fecha[1], mes: mes[fecha[0]], anio: fecha[2]};
  document.querySelector(".diaAlb.a"+id).value=result.dia;
  document.querySelector(".mesAlb.a"+id).value=result.mes;
  document.querySelector(".anioAlb.a"+id).value=result.anio;
  return result;
}

/* function getOrigenBanMA(txt){
  let index = txt.indexOf("Location:");
  index = txt.indexOf("<dd>",index);
  if(txt.charAt(index+4)=="<") index = txt.indexOf(">",index+5)+1;
  else index += 4;
  document.getElementById("origenBan").value=txt.substring(index,txt.indexOf("<",index));
  return txt.substring(index,txt.indexOf("<",index));
} */

function getImagenAlbMA(txt, id){
  let index = txt.indexOf("album_img");
  index = txt.indexOf('<img src="',index)+10;
  document.querySelector(".imgAlb.a"+id).value=txt.substring(index,txt.indexOf('"',index));
  return txt.substring(index,txt.indexOf('"',index));
}

/* function getEstatusBanMA(txt){
  let index = txt.indexOf("Status:");
  index = txt.indexOf("<dd",index);
  index = txt.indexOf(">",index)+1;
  document.getElementById("estatusBan").value=txt.substring(index,txt.indexOf("<",index));
  return txt.substring(index,txt.indexOf("<",index));
}

function getWebBanMA(txt){
  let index = txt.search(/http.{1,50}\" title=\"Go to: Homepage\"/);
  console.log(txt.substring(index,index+20))
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
  console.log(etapas)
  let result = [];
  for(let i=0; i<etapas.length; i++){
    result[i]={anioInic: etapas[i].split("-")[0], anioFin: etapas[i].split("-")[1], tipo: "ACTIVO"}
    if(result[i].anioFin == 'present') result[i].anioFin = "";
  }
  console.log(result)
  addEtapas(result);
  return result;
} */

function getMusicosAlbMA(txt){
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
      if(txt1.substring(index,index+1)=="<"){
        index = txt1.indexOf("http",index);
        link = txt1.substring(index,txt1.indexOf('"',index));
        index = txt1.indexOf(">",index)+1;
      } 
      let nombre = txt1.substring(index,txt1.indexOf("<",index));
      index = txt1.indexOf('<td>',index)+4;
      let anios = txt1.substring(index,txt1.indexOf("</td>",index)).trim().split("&nbsp;")[1];
      anios = anios.substring(1,anios.length-1).split(", ");
      for(let anio of anios){
        result[idx] = {nombre: "", link: "", anioInic: 0, anioFin: 0};
        result[idx].nombre = nombre;
        result[idx].link = link;
        result[idx].anioInic = anio.split("-")[0];
        if(anio.split("-")[1]) result[idx].anioFin = anio.split("-")[1];
        else result[idx].anioFin = anio.split("-")[0];
        if(result[idx].anioFin == 'present') result[idx].anioFin = "";
        idx++;
      }
    } while(index <= txt1.lastIndexOf('lineupRow'));
  }
  return result;
}

/* function getTemasBanMA(txt){
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

function addGeneros(generos){
  tbodyGeneros.innerHTML="";
  for(let genero of generos){
    tbodyGeneros.innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input name="nombreGenBan[]" value="${genero.nombre}" class="form-control nombreGenBan" list="genlist"></td>
      <td><input name="estrellasGenBan[]" value="${genero.estrellas}" type="number" class="form-control estrellasGenBan" min="0" max="5" value="0"></td>
    </tr>`;
  }
}

function addTemasLetra(temas){
  tbodyTemas.innerHTML="";
  for(let tema of temas){
    tbodyTemas.innerHTML+=`
    <tr>
      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
      <td><input type="text" value="${tema.nombre}" class="form-control temaLetra" name="temaLetra[]"></td>
    </tr>`;
  }
} */

//BOTÓN GENERAR PROPUESTA ÁLBUM 
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
      /* albumes[id].tipo = getTipoAlbMA(txt); //---
      albumes[id].duracion = getDuracionAlbMA(txt); //---
      albumes[id].discograficas = getDiscograficasAlbMA(txt); //---
      albumes[id].estudios = getEstudiosAlbMA(txt); //---
      albumes[id].musicos = getMusicosAlbMA(txt); //--- */
  } else alert("Debes incluir contenido HTML");
});