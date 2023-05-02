let url = location.href;
if(url.includes("?")){
  url = url.substring(url.indexOf("?")+1);
  if(url == "newLogin") showAlert("SUCCESS",'Felicidades, ya tienes tu propia cuenta de MetaList. Puedes iniciar sesión en el apartado "Login" con tu email y tu contraseña');
}