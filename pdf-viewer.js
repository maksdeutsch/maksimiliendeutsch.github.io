document.addEventListener('DOMContentLoaded', function () {


pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js';

const containers = document.querySelectorAll('#pdf-container, .pdf-container');


containers.forEach(container => {


const url = container.getAttribute('data-pdf');
if (!url) return;


pdfjsLib.getDocument(url).promise.then(pdf => {


for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
pdf.getPage(pageNum).then(page => {


const scale = 2;
const viewport = page.getViewport({ scale });


const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');


canvas.width = viewport.width;
canvas.height = viewport.height;


container.appendChild(canvas);


page.render({
canvasContext: context,
viewport: viewport
});
});
}


}).catch(error => {
console.error('Erreur PDF.js :', error);
container.innerHTML = 'Impossible de charger le PDF.';
});


});
});