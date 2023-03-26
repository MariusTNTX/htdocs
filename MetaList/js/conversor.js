let txt1 = document.getElementById("txt1");
let btnConv = document.getElementById("btnConv");
let txt2 = document.getElementById("txt2");
let regis=[], anio, linea="", tipo="";
let infoAnio={
  anio: "",
  canciones: [],
  generos: [],
  albumes: [],
  generosAlbumes: [],
  bandas: [],
  generosBandas: []
};

//AÑADE INFORMACIÓN DE UN REGISTRO A LA INFORMACIÓN DEL AÑO
function addResult(reg){
  let estrCan=0, banda="", album="", cancion="", tags, aux, nuevaBan=false, nuevoAlb=false, generos = [];
  //Quitar (years)
  if(reg.endsWith("years)")) reg = reg.substring(0, reg.lastIndexOf("("));
  //Quitar numeración y tabulaciones
  if(reg.indexOf(".")>=1 && reg.indexOf(".")<=3){
    reg = reg.substring(reg.indexOf(".")+1);
    reg = reg.trim();
  }
  //Quitar º
  if(reg.includes("º")) reg = reg.substring(1);
  //Estrellas Canción
  estrCan = reg.substring(0,3);
  reg = reg.substring(3);
  if(estrCan=="***") estrCan=3;
  else if(estrCan=="-**") estrCan=2;
  else if(estrCan=="--*") estrCan=1;
  else if(estrCan=="---") estrCan=0;
  //Banda
  banda = reg.substring(0,reg.indexOf("(")-1);
  reg = reg.substring(reg.indexOf(")")+2);
  //Nueva Banda
  if(reg.substring(0,1)=="+") nuevaBan=true;
  reg = reg.substring(2);
  //Canción
  cancion = reg.substring(0,reg.lastIndexOf("(")-1);
  reg = reg.substring(reg.lastIndexOf("(")+1);
  //Nuevo Álbum
  if(reg.substring(0,1)=="·"){
    nuevoAlb=true;
    reg = reg.substring(1);
  } 
  //Álbum
  album = reg.substring(0,reg.indexOf(")"));
  reg = reg.substring(reg.indexOf(")")+2);
  //Géneros
  tags = reg.split("#");
  tags.shift();
  for(let i=0; i<tags.length; i++){
    if(tags[i].includes("’")){
      aux = tags[i].split("’").length-1;
      generos.push({nombre: tags[i].substring(0,tags[i].indexOf("’")), estrellas: aux});
    } else generos.push({nombre: tags[i].trim(), estrellas: 0});
  }
  //Añadir Canción
  infoAnio.canciones.push({banda: banda, album: album, cancion: cancion, estrellas: estrCan});
  //Añadir Géneros
  for(let gen of generos){
    if(!infoAnio.generos.includes(gen.nombre)) infoAnio.generos.push(gen.nombre);
  }
  //Añadir Álbum y Géneros de Álbum
  if(nuevoAlb){
    infoAnio.albumes.push({banda: banda, album: album, anio: anio, enLista: 'SI'});
    for(let gen of generos){
      infoAnio.generosAlbumes.push({banda: banda, album: album, genero: gen.nombre,estrellas: gen.estrellas});
    }
  }
  //Añadir Banda y Géneros de Banda
  if(nuevaBan){
    infoAnio.bandas.push(banda);
    for(let gen of generos){
      infoAnio.generosBandas.push({banda: banda, genero: gen.nombre});
    }
  }
}

//DEVUELVE LA SENTENCIA SQL CORRESPONDIENTE AL TIPO DE DATO INDICADO
function addSenten(res, tipo){
  switch(tipo){
    case 'generos': query=`INSERT INTO GENEROS(NomGen) SELECT "${res}" WHERE NOT EXISTS(SELECT 1 FROM GENEROS WHERE NomGen = "${res}");`;
      break;
    case 'bandas': query=`INSERT INTO BANDAS(NomBan) VALUES("${res}");`;
      break;
    case 'albumes': query=`INSERT INTO ALBUMES(NomBan,NomAlb,Anio,EnLista) VALUES("${res.banda}","${res.album}","${res.anio}","${res.enLista}");`;
      break;
    case 'canciones': query=`INSERT INTO CANCIONES(NomBan,NomAlb,NomCan,Estrellas) VALUES("${res.banda}","${res.album}","${res.cancion}","${res.estrellas}");`;
      break;
    case 'generosBandas': query=`INSERT INTO GENEROS_BANDAS(NomBan,NomGen) VALUES("${res.banda}","${res.genero}");`;
      break;
    case 'generosAlbumes': query=`INSERT INTO GENEROS_ALBUMES(NomBan,NomAlb,NomGen,Estrellas) VALUES("${res.banda}","${res.album}","${res.genero}","${res.estrellas}");`;
      break;
  }
  txt2.value+=query+"\n";
}

//EVENTO DEL BOTÓN DE CONVERSIÓN
btnConv.addEventListener("click",()=>{
  txt2.value="";
  //Si hay texto
  if(txt1.value!=''){
    //Almacenar las lineas
    regis = txt1.value.split("\n");
    regis = regis.filter(reg => reg.length > 0);
    //Separar el año de los registros
    if(regis[0].length==4){
      anio = regis[0];
      regis.shift();
      infoAnio.anio=anio;

      try { //1. Generar objetos con los registros
        for(let reg of regis){
          linea = reg.trim();
          addResult(reg.trim());
        }
      } catch (error) { //Si hay un error se indica el registro y se detiene la ejecución
        alert("Error de lectura en: '"+linea+"'");
      }

      try { //2. Imprimir sentencias SQL con los resultados
        for(let res of infoAnio.generos){
          tipo = "generos";
          linea = res;
          addSenten(res, tipo);
        }
        for(let res of infoAnio.bandas){
          tipo = "bandas";
          linea = res;
          addSenten(res, tipo);
        }
        for(let res of infoAnio.albumes){
          tipo = "albumes";
          linea = res;
          addSenten(res, tipo);
        }
        for(let res of infoAnio.canciones){
          tipo = "canciones";
          linea = res;
          addSenten(res, tipo);
        }
        for(let res of infoAnio.generosBandas){
          tipo = "generosBandas";
          linea = res;
          addSenten(res, tipo);
        }
        for(let res of infoAnio.generosAlbumes){
          tipo = "generosAlbumes";
          linea = res;
          addSenten(res, tipo);
        }
      } catch (error) { //Si hay un error se indica la linea y se detiene la ejecución
        alert("Error de composición en '"+tipo+"' en la linea: '"+linea+"'");
      }
    } else alert("Debes indicar un año en la primera linea");
  } else alert("Debes introducir texto en la primera area de texto");
});