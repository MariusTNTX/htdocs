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