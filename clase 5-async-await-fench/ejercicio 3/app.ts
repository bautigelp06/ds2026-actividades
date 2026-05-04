interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const input = document.getElementById('inputBusqueda') as HTMLInputElement;
const btn = document.getElementById('btnBuscar') as HTMLButtonElement;
const contenedor = document.getElementById('resultados') as HTMLDivElement;
const errorDiv = document.getElementById('mensajeError') as HTMLDivElement;

async function buscarLibros(termino: string) {
    contenedor.innerHTML = "<p>Cargando...</p>";
    errorDiv.innerText = "";
    try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termino)}`);
        const data = await res.json();
        const libros: LibroOL[] = data.docs.slice(0, 10);
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
    } catch {
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