interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: "101", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true },
    { isbn: "102", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false }
];

const listaUl = document.getElementById('listado') as HTMLUListElement;
const statsP = document.getElementById('stats') as HTMLParagraphElement;
const errorDiv = document.getElementById('errorForm') as HTMLDivElement;
const inputFiltro = document.getElementById('filtroAutor') as HTMLInputElement;

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const t = (document.getElementById('titulo') as HTMLInputElement).value.trim();
    const a = (document.getElementById('autor') as HTMLInputElement).value.trim();
    const p = parseFloat((document.getElementById('precio') as HTMLInputElement).value);

    if (!t || !a || isNaN(p) || p <= 0) return null;

    return {
        isbn: "AUTO-" + Date.now(),
        titulo: t,
        autor: a,
        precio: p,
        disponible: true
    };
}

function renderizar(libros: Libro[]): void {
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
            const btn = e.target as HTMLButtonElement;
            const id = btn.getAttribute('data-isbn');
            if (id) eliminarLibro(id);
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
    } else {
        errorDiv.innerText = "";
        agregarLibro(nuevo);
        (document.getElementById('titulo') as HTMLInputElement).value = "";
        (document.getElementById('autor') as HTMLInputElement).value = "";
        (document.getElementById('precio') as HTMLInputElement).value = "";
    }
});

document.getElementById('filtrar')?.addEventListener('click', () => {
    const busqueda = inputFiltro.value.toLowerCase();
    renderizar(catalogo.filter(l => l.autor.toLowerCase().includes(busqueda)));
});

document.getElementById('mostrarTodos')?.addEventListener('click', () => renderizar(catalogo));

renderizar(catalogo);