"use strict";
const input = document.getElementById('inputBusqueda');
const btn = document.getElementById('btnBuscar');
const contenedor = document.getElementById('resultados');
const errorDiv = document.getElementById('mensajeError');

async function buscarLibros(termino) {
    contenedor.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>`;
    
    errorDiv.innerText = "";
    
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`);
        const data = await res.json();
        const libros = data.docs.slice(0, 10);
        
        contenedor.innerHTML = "";
        
        if (libros.length === 0) {
            contenedor.innerHTML = "<p class='text-center w-100'>Sin resultados.</p>";
            return;
        }

        libros.forEach(l => {
            const autor = l.author_name ? l.author_name[0] : "Desconocido";
            const anio = l.first_publish_year ? l.first_publish_year : "S/D";
            
           
            contenedor.innerHTML += `
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-primary">${l.title}</h5>
                            <p class="card-text"><strong>Autor:</strong> ${autor}</p>
                            <p class="card-text text-muted">Año: ${anio}</p>
                            <a href="libro.html" class="btn btn-outline-primary btn-sm">Ver detalle</a>
                        </div>
                    </div>
                </div>`;
        });
    }
    catch {
        contenedor.innerHTML = "";
        errorDiv.innerText = "Error en la conexión con la biblioteca.";
    }
}

btn.addEventListener('click', () => {
    if (!input.value.trim()) {
        errorDiv.innerText = "Por favor, escribe un título.";
        return;
    }
    buscarLibros(input.value.trim());
});