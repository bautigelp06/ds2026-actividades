"use strict";
let catalogo = [
    { isbn: "101", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true },
    { isbn: "102", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false }
];
const listaUl = document.getElementById('listado');
const statsP = document.getElementById('stats');
const errorDiv = document.getElementById('errorForm');
const inputFiltro = document.getElementById('filtroAutor');
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const t = document.getElementById('titulo').value.trim();
    const a = document.getElementById('autor').value.trim();
    const p = parseFloat(document.getElementById('precio').value);
    if (!t || !a || isNaN(p) || p <= 0)
        return null;
    return {
        isbn: "AUTO-" + Date.now(),
        titulo: t,
        autor: a,
        precio: p,
        disponible: true
    };
}
function renderizar(libros) {
    listaUl.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${l.titulo} - ${l.autor} ($${l.precio}) 
            <button class="btn-borrar" data-isbn="${l.isbn}">Eliminar</button>
        `;
        listaUl.appendChild(li);
    });
    document.querySelectorAll('.btn-borrar').forEach(b => {
        b.addEventListener('click', (e) => {
            const btn = e.target;
            const id = btn.getAttribute('data-isbn');
            if (id)
                eliminarLibro(id);
        });
    });
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    const prom = libros.length > 0 ? total / libros.length : 0;
    statsP.innerText = `Libros: ${libros.length} | Promedio: $${prom.toFixed(2)}`;
}
document.getElementById('btnAgregar')?.addEventListener('click', () => {
    const nuevo = validarFormulario();
    if (!nuevo) {
        errorDiv.innerText = "Error: Datos inválidos";
    }
    else {
        errorDiv.innerText = "";
        agregarLibro(nuevo);
        document.getElementById('titulo').value = "";
        document.getElementById('autor').value = "";
        document.getElementById('precio').value = "";
    }
});
document.getElementById('filtrar')?.addEventListener('click', () => {
    const busqueda = inputFiltro.value.toLowerCase();
    renderizar(catalogo.filter(l => l.autor.toLowerCase().includes(busqueda)));
});
document.getElementById('mostrarTodos')?.addEventListener('click', () => renderizar(catalogo));
renderizar(catalogo);
