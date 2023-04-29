function addShowPassSwitch(loginPassEye, loginPass){
  loginPassEye.addEventListener("click",()=>{
    if(/* passView */ loginPassEye.classList.contains("bi-eye-slash-fill")){
      loginPass.type = "password";
      loginPassEye.classList.replace("bi-eye-slash-fill","bi-eye-fill");
    } else {
      loginPass.type = "text";
      loginPassEye.classList.replace("bi-eye-fill","bi-eye-slash-fill");
    }
  });
}

function showAlert(tipo,txt){
  tipo = tipo.trim().toLowerCase();
  let tipos = {
    success: {i: "bi-check-circle-fill", bg: "bg-success bg-gradient", color: "text-white"},
    info: {i: "bi-info-circle-fill", bg: "bg-primary bg-gradient", color: "text-white"},
    warning: {i: "bi-exclamation-triangle-fill", bg: "bg-warning bg-gradient", color: "text-dark"},
    error: {i: "bi-x-octagon-fill", bg: "bg-danger bg-gradient", color: "text-white"},
  }
  document.getElementById("alertTemplate").innerHTML=`
    <button class="btn btn-primary d-none" id="alertStart" type="button" data-bs-toggle="offcanvas" data-bs-target="#alertBack" aria-controls="alertBack"></button>
    <div class="offcanvas offcanvas-top ${tipos[tipo].bg} m-3 rounded shadow" tabindex="-1" id="alertBack" aria-labelledby="alertBackLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title ${tipos[tipo].color} me-3 fs-6" id="alertBackLabel">
          <i class="bi ${tipos[tipo].i} align-middle me-2" id="alertIcon"></i>
          <span id="alertText">${txt}</span>
        </h5>
        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>
  `;
  document.getElementById("alertStart").dispatchEvent(new Event("click"));
}