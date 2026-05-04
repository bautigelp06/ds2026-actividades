"use strict";
const input = document.getElementById('inputBusqueda');
const btn = document.getElementById('btnBuscar');
const contenedor = document.getElementById('resultados');
const errorDiv = document.getElementById('mensajeError');
async function buscarLibros(termino) {
    contenedor.innerHTML = "<p>Cargando...</p>";
    errorDiv.innerText = "";
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`);
        const data = await res.json();
        const libros = data.docs.slice(0, 10);
        contenedor.innerHTML = "";
        if (libros.length === 0) {
            contenedor.innerHTML = "<p>Sin resultados.</p>";
            return;
        }
        libros.forEach(l => {
            const card = document.createElement('div');
            card.style.border = "1px solid #ccc";
            card.style.padding = "10px";
            const autor = l.author_name ? l.author_name[0] : "Desconocido";
            const anio = l.first_publish_year ? l.first_publish_year : "S/D";
            card.innerHTML = `<h3>${l.title}</h3><p>${autor}</p><p>${anio}</p>`;
            contenedor.appendChild(card);
        });
    }
    catch {
        contenedor.innerHTML = "";
        errorDiv.innerText = "Error en la búsqueda";
    }
}
btn.addEventListener('click', () => {
    if (!input.value.trim()) {
        errorDiv.innerText = "Campo vacío";
        return;
    }
    buscarLibros(input.value.trim());
});
