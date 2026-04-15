
let pdfDoc=null;
let paginaAtual=1;
let escala=1.2;

const canvas=document.getElementById("pdf-render");
const ctx=canvas.getContext("2d");

/* ABRIR */
function abrirPDF(){
  document.getElementById("modal").style.display="block";

  pdfjsLib.getDocument("CTB.pdf").promise.then(pdf=>{
    pdfDoc=pdf;
    paginaAtual=1;
    renderizarPagina();
  });
}

/* FECHAR */
function fecharPDF(){
  document.getElementById("modal").style.display="none";
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

