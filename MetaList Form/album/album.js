
/* document.getElementById("btnMus").addEventListener("click", () => {
  console.log("addMus()");
  document.getElementById("listMus").innerHTML+=`==> Nombre: <input type="text" name="txtNomMus[]"><br>`;
}); */

let nomSecciones = {
  'Gen': ['nom'],
  'Est': ['nom'],
  'Pro': ['nom','sex'],
  'Mus': ['nom','sex'],
  'Vid': ['vid'],
  'Fun': ['nom','sex']
};

/* for(let nom of nomSecciones){
  document.getElementById('btn'+nom).addEventListener("click",()=>{
    document.getElementById('tbl'+nom).innerHTML += `<tr><td></td></tr>`;
  });
} */

function nuevaFila(nom){
  console.log(nom);
  let tabla = document.getElementById('tbl'+nom);
  let txt = `<tr class="${nom} hidden">`;
  for(let e of nomSecciones[nom]){
    let s = (e=='sex') ? ' size="2"' : '';
    let type = (nom=='Gen') ? 'list="genlist"' : 'type="text"';
    txt += `<td><input ${type} name="${e+nom}[]"${s}></td>`;
  }
  txt += "<td><button class='remove'>X</button></td></tr>";
  tabla.innerHTML += txt;
}

for(let nom in nomSecciones){
  for(let i=0; i<20; i++) nuevaFila(nom);
  
  document.getElementById('btn'+nom).addEventListener("click",(e)=>{
    let n = e.target.id.substr(3);
    document.getElementsByClassName(n+' hidden')[0].classList.remove("hidden");
  });
}

//Evita que los button hagan submit
document.getElementsByTagName("FORM")[0].addEventListener("submit",(e)=>{
  if(e.submitter.name!='submit') e.preventDefault();
});