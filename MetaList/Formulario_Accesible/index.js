/* Elementos del DOM */
let txtContr = document.getElementById("txtContr");
let divContr = document.getElementById("divContr");
let txtReContr = document.getElementById("txtReContr");
let divReContr = document.getElementById("divReContr");
let btnSubmit = document.getElementById("btnSubmit");

/* Expresiones Regulares */
let exp1 = new RegExp(/.{8,}/);
let exp2 = new RegExp(/[A-Z]{1,}/);
let exp3 = new RegExp(/\d{1,}/);
let exp4 = new RegExp(/[ºª!\|"@·#$~%&/()=?'¡¿`^\[\]+*´¨\{ç\}<>,;\.:\-_]{1,}/);


/* EVENTO SUBMIT */
document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{

  //Se obtienen los valores de las contraseñas
  let p1 = txtContr.value;
  let p2 = txtReContr.value;

  //Se resetean las clases "is-invalid"
  divContr.classList.remove("is-invalid");
  txtContr.classList.remove("is-invalid");
  divReContr.classList.remove("is-invalid");
  txtReContr.classList.remove("is-invalid");

  //Verificar que la contraseña cumple con los patrones
  if(!exp1.test(p1) || !exp2.test(p1) || !exp3.test(p1) || !exp4.test(p1)){
    divContr.classList.add("is-invalid");
    txtContr.classList.add("is-invalid");
    e.preventDefault();

  //Verificar que la contraseña repetida coincide con la original
  } else if(p1 != p2) { 
    divReContr.classList.add("is-invalid");
    txtReContr.classList.add("is-invalid");
    e.preventDefault();
  }
});


