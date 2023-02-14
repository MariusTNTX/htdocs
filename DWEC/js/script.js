async function miPeticionGET(){
  let texto;
  try {
    let response = await fetch(`http://192.168.7.181:8080/php/ajaxGET.php?nif=${document.getElementById("nif").value}&Enviar=enviar`,{ //Promesa
      method: "get",
      mode: "cors"
    });
    /* let response = await fetch("http://localhost/DWEC/php/comprobacionGET.php?nif=12345678A&Enviar=enviar",{ //Promesa
      method: "get",
      mode: "cors"
    }); */
    texto = await response.text(); //Promesa
  } catch (error) {
    texto = `Error: ${error}`;
  }
  let p = document.createElement("p");
  p.style.textAlign = "center";
  p.textContent = texto;
  document.body.appendChild(p);
}

async function miPeticionGET2(){
  let json;
  try {
    let response = await fetch(`http://192.168.7.181:8080/php/jsonGET.php`);
    json = await response.json(); //Promesa
  } catch (error) {
    json = `Error: ${error}`;
  }
  let p = document.createElement("p");
  p.style.textAlign = "center";
  p.textContent = json;
  document.body.appendChild(p);
}

async function miPeticionPOST(){
  try {
    let response = await fetch("http://localhost/DWEC/php/comprobacionGET.php?nif=12345678A&Enviar=enviar",{
      method: "post",
      mode: "cors",
      headers:{
        'Content-Type':"application/x-www-form-urlencoded"
      },
      body:`nif=${document.getElementById("nif").value}$Enviar=enviar`
    });
    console.log(response.status);
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
  document.getElementById("miEnvioGET").addEventListener("click",()=>{
    miPeticionGET();
  });

  //Botón miEnvio
  document.getElementById("miEnvioPOST").addEventListener("click",()=>{
    miPeticionPOST();
  });

  //Clase Coche
  let ObjCoche = function(m,t){
    this.marca = m;
    this.tipo = t;
  }

  //Objeto coche
  let coche1 = new ObjCoche('Seat','Ibiza');

  let avion = {
    nombre: "boing",
    tipo: 747
  }

});