async function setBind(localidad){
  let key="Auj0mPIeYKbE8_Ut_UwG1y8RUzloEi0j-PitH742u-9gsfHUiq569Rjrd6myttjY";
  try {
    let response = await fetch(`http://dev.virtualearth.net/REST/v1/Locations?query=${localidad}&maxResults=20&key=${key}`);
    response = await response.json();
    response = response.resourceSets[0].resources;
    for(let i in response){
      localidades.innerHTML+=`<option value="${response[i].point.coordinates[0]},${response[i].point.coordinates[1]}">${response[i].name}</option>`;
    } 
    setWeather(response[0].point.coordinates[0],response[0].point.coordinates[1]);
  } catch (er) {
    error.textContent="No se encontraron resultados";
    console.error("CATCH BIND ERROR: "+er);
  }
}

async function setWeather(x, y){
  let appid="66155b21c21b781f8626619d15e80b6b";
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${appid}&units=metric`);
    response = await response.json();
    localidadEncontrada.textContent = response.name;
    descripcion.textContent = response.weather[0].description;
    icono.firstElementChild.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
    humedad.textContent = response.main.humidity + " g/m3";
    temperatura.textContent = response.main.temp + " grados";
    viento.textContent = response.wind.speed + " m/s";
  } catch (er) {
    console.error("CATCH WEATHER ERROR: "+er);
  }
}

window.addEventListener("load",()=>{
  let localidadEncontrada = document.getElementById("localidadEncontrada");
  let icono = document.getElementById("imagenTiempo");
  let temperatura = document.getElementById("temperatura");
  let viento = document.getElementById("viento");
  let humedad = document.getElementById("humedad");
  let descripcion = document.getElementById("descripcion");

  let error = document.getElementById("error");
  let localidad = document.getElementById("localidad");
  let buscar = document.getElementById("buscar");
  let localidades = document.getElementById("localidades");

  /* Cuando se presione el BOTÓN localidad se eliminará del txtfield y se 
  realizará una búsqueda sobre ese contenido. Si no obtiene nada mostrará un 
  mensaje de error, y si encuentra algo meterá todo el contenido obtenido de 
  bind dentro de la lista de localidades y eliminará el mensaje de error */
  buscar.addEventListener("click",()=>{
    localidades.innerHTML="";
    if(localidad.value.length>0){
      setBind(localidad.value.toLowerCase().trim());
      localidad.value="";
    } else error.textContent="Debes indicar contenido en la búsqueda";
  });

  /* Cuando se cambie el estado de la LISTA de localidades, si el contenido 
  actual tiene texto se realizará una búsqueda en openweather y se obtendrá 
  nombre, icono, temperatura, viento, humedad y descripción */
  localidades.addEventListener("change",()=>{
    locs = localidades.value.split(',');
    setWeather(locs[0],locs[1]);
  });
})