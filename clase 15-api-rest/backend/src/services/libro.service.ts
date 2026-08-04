import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 28500,
    imagen: "https://covers.openlibrary.org/b/id/8259441-L.jpg",
  },
  {
    id: 2,
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 19400,
    imagen: "https://covers.openlibrary.org/b/id/8381896-L.jpg",
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    precio: 16800,
    imagen: "https://covers.openlibrary.org/b/id/12648505-L.jpg",
  },
];

let proximoId = 4;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const indice = libros.findIndex((l) => l.id === id);
  if (indice === -1) return undefined;
  libros[indice] = { id, ...datos };
  return libros[indice];
}

export function remove(id: number): boolean {
  const indice = libros.findIndex((l) => l.id === id);
  if (indice === -1) return false;
  libros.splice(indice, 1);
  return true;
}
