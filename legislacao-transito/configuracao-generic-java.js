

/* LOAD */
window.onload=()=>{
  ativarChecks();
}

/* CHECKPOINT */
function ativarChecks(){
  document.querySelectorAll(".artigo").forEach((artigo,i)=>{
    const check = artigo.querySelector("input");

    check.checked = localStorage.getItem("c"+i)==="true";

    if(check.checked){
      artigo.classList.add("lido");
    }

    check.onchange=()=>{
      localStorage.setItem("c"+i,check.checked);

      if(check.checked){
        artigo.classList.add("lido");
      }else{
        artigo.classList.remove("lido");
      }
    }
  });
}

/* BUSCA */
function buscar(v){
  document.querySelectorAll(".artigo").forEach(a=>{
    a.style.display = a.innerText.toLowerCase().includes(v.toLowerCase()) ? "flex":"none";
  });
}

/* RESET */
function resetar(){
  if(confirm("Apagar tudo?")){
    localStorage.clear();
    location.reload();
  }
}
