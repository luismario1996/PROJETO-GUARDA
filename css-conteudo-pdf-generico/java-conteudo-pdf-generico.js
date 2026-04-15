
let pdfDoc=null;
let paginaAtual=1;
let escala=1.2;

const canvas=document.getElementById("pdf-render");
const ctx=canvas.getContext("2d");


function abrirPDF(){
  const modal = document.getElementById("modal");

  modal.style.display = "block";

  setTimeout(() => {
    pdfjsLib.getDocument("CTB.pdf").promise.then(pdf=>{
      pdfDoc = pdf;
      paginaAtual = 1;
      renderizarPagina();
    });
  }, 100);
}


/* ABRIR */
function renderizarPagina(){

  pdfDoc.getPage(paginaAtual).then(page=>{

    const container = document.querySelector(".viewer");

    let larguraContainer = container.clientWidth;

    if(!larguraContainer || larguraContainer < 100){
      larguraContainer = window.innerWidth;
    }

    const viewportOriginal = page.getViewport({ scale: 1 });

    const escalaBase = larguraContainer / viewportOriginal.width;

    const deviceScale = window.devicePixelRatio || 1;

    const viewport = page.getViewport({
      scale: escalaBase * escala * deviceScale
    });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    canvas.style.width = (viewport.width / deviceScale) + "px";
    canvas.style.height = (viewport.height / deviceScale) + "px";

    page.render({
      canvasContext: ctx,
      viewport: viewport
    });

  });
}


/* FECHAR */
function fecharPDF(){
  document.getElementById("modal").style.display="none";
}

function toggleFullscreen(){

  const modal = document.getElementById("modal");
  const btn = event.target;

  if(!document.fullscreenElement){
    modal.requestFullscreen();
    btn.innerText = "🡼";
  } else {
    document.exitFullscreen();
    btn.innerText = "⛶";
  }

}


/* RENDER */
function renderizarPagina(){
  pdfDoc.getPage(paginaAtual).then(page=>{

    let viewport=page.getViewport({scale:escala});

    canvas.height=viewport.height;
    canvas.width=viewport.width;

    page.render({
      canvasContext:ctx,
      viewport:viewport
    });

  });
}

/* NAVEGAÇÃO */
function proximo(){
  if(paginaAtual<pdfDoc.numPages){
    paginaAtual++;
    renderizarPagina();
  }
}

function voltar(){
  if(paginaAtual>1){
    paginaAtual--;
    renderizarPagina();
  }
}

/* ZOOM */
function zoomMais(){
  escala+=0.2;
  renderizarPagina();
}

function zoomMenos(){
  if(escala>0.6){
    escala-=0.2;
    renderizarPagina();
  }
}

