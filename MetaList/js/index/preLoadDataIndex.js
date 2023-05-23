var dataList = {notices: [], anniversaries: [], incorporations: [], stats: []};

//Establecer lista de noticias
setDataList();


//Función Obtener listas de noticias
async function setDataList(){
  console.log("Obteniendo datos")
  dataList.notices = await getNotices();
  dataList.anniversaries = await getAnniversaries();
  dataList.incorporations = await getIncorporations();
  dataList.stats = await getStats(true);
  dataList.stats = dataList.stats[0];
  console.log("Datos obtenidos, enviando datos")
  document.getElementById("preLoadData").dispatchEvent(new Event("click"));
}

//Función Obtener Noticias
async function getNotices(){
  let result = [], res = {}, day = 1000*60*60*24, today = new Date(), lastMonths = new Date(new Date().getTime()-day*90);
  res.today = await list("articulos",true,["anioArticulo",today.getFullYear()],["mesArticulo",today.getMonth()+1],["diaArticulo",today.getDate()],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.today.response.map(r=>{r.timeCategory="filter-today"; return r}));
  res.curMonth = await list("articulos",true,["anioArticulo",today.getFullYear()],["mesArticulo",today.getMonth()+1],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.curMonth.response.map(r=>{r.timeCategory="filter-curMonth"; return r}));
  res.lastMonths = await list("articulos",true, ["anioArticulo_Min",lastMonths.getFullYear()],["mesArticulo_Min",lastMonths.getMonth()+1],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.lastMonths.response.map(r=>{r.timeCategory="filter-lastMonths"; return r}));
  res.curYear = await list("articulos",true,["anioArticulo_Min",today.getFullYear()],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.curYear.response.map(r=>{r.timeCategory="filter-curYear"; return r}));
  res.full = await list("articulos",true,["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.full.response.map(r=>{r.timeCategory="filter-full"; return r}));
  let fulldata = [];
  result.reduce((res,n)=>{
    if(fulldata.filter(r=>r.nombre==n.nombre).length==0) fulldata.push(n);
    else fulldata[fulldata.findIndex(r=>r.nombre==n.nombre)].timeCategory+=" "+n.timeCategory; 
  });
  return fulldata.sort((a,b)=>b.visitas-a.visitas);
}

//Función Obtener Aniversarios
async function getAnniversaries(){
  let result = [], res = {}, date = new Date().getDate(), month = new Date().getMonth()+1, year = new Date().getFullYear();
  res.albums = await list("albumes",true,["diaAlbum",date],["mesAlbum",month],["anioAlbum_Max",year-1],["order","visitasAlbum_Desc"]);
  result.push(...res.albums.response.map(r=>{
    r.annCategory="album"; 
    r.diffYears=year-r.anio; 
    return r;
  }));
  res.birthdays = await list("musicos",true,["diaNacimientoMusico",date],["mesNacimientoMusico",month],["anioNacimientoMusico_Max",year-1],["order","visitasMusico_Desc"]);
  result.push(...res.birthdays.response.map(r=>{
    r.annCategory="birthday"; 
    r.diffYears=year-r.anioNacimiento; 
    return r;
  }));
  res.deathdays = await list("musicos",true,["diaDefuncionMusico",date],["mesDefuncionMusico",month],["anioDefuncionMusico_Max",year-1],["order","visitasMusico_Desc"]);
  result.push(...res.deathdays.response.map(r=>{
    r.annCategory="deathday"; 
    r.diffYears=year-r.anioDefuncion; 
    return r;
  }));
  return result.sort((a,b)=>b.visitas-a.visitas);
}

//Función Obtener Incorporaciones
async function getIncorporations(){
  let result = await list("bandas",true,["order","fechaIncorporacionBanda_Desc"],["limit",4]);
  return result.response;
}