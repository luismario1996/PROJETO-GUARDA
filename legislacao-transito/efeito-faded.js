// FADE IN AO CARREGAR
window.addEventListener("load", ()=>{
  document.body.classList.add("loaded");
});

// FUNÇÃO GLOBAL DE NAVEGAÇÃO
function irPara(pagina){
  document.body.classList.add("fade-out");

  setTimeout(()=>{
    window.location.href = pagina;
  }, 400);
}
