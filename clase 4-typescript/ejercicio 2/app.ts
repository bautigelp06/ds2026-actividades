interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; 
}

const catalogo: Libro[] = [
    { isbn: "978-01", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 1200, disponible: true },
    { isbn: "978-02", titulo: "Rayuela", autor: "Julio Cortázar", precio: 1500, disponible: false },
    { isbn: "978-03", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 1100, disponible: true },
    { isbn: "978-04", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 2000, disponible: true }
];

const inputFiltro = document.getElementById('filtroAutor') as HTMLInputElement;
const btnFiltrar = document.getElementById('filtrar') as HTMLButtonElement;
const btnDisponibles = document.getElementById('mostrarDisponibles') as HTMLButtonElement;
const btnTodos = document.getElementById('mostrarTodos') as HTMLButtonElement;
const listaLibros = document.getElementById('listado') as HTMLUListElement;
const statsContainer = document.getElementById('stats') as HTMLParagraphElement;

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => 
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const suma = libros.reduce((acc, libro) => acc + libro.precio, 0);
    return suma / libros.length;
}

function renderizar(libros: Libro[]): void {
   
    listaLibros.innerHTML = "";
    
    
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        listaLibros.appendChild(li);
    });

    const promedio = precioPromedio(libros);
    statsContainer.innerText = `Cantidad: ${libros.length} | Precio Promedio: $${promedio.toFixed(2)}`;
}

btnFiltrar.addEventListener('click', () => {
    renderizar(buscarPorAutor(inputFiltro.value));
});

btnDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener('click', () => {
    renderizar(catalogo);
});


renderizar(catalogo);