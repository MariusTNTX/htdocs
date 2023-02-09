async function miPeticion(){
  try {
    let respuesta = await fetch("http://localhost/DWEC/php/comprobacionGET.php?nif=12345678A&Enviar=enviar");
    console.log(respuesta.status);
  } catch (error) {
    console.log("Error: "+error);
  }
}

window.addEventListener("load",()=>{

  //Prevenir el Submit
  document.querySelector("form").addEventListener("submit",(e)=>{
    /* e.preventDefault(); */
  });

  //Botón miEnvio
  document.querySelector("#miEnvio").addEventListener("click",()=>{
    miPeticion();
  });

});