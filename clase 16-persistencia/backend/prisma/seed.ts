import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 28500,
    imagen: "https://covers.openlibrary.org/b/id/8259441-L.jpg",
    disponible: true,
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 19400,
    imagen: "https://covers.openlibrary.org/b/id/8381896-L.jpg",
    disponible: true,
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    precio: 16800,
    imagen: "https://covers.openlibrary.org/b/id/12648505-L.jpg",
    disponible: true,
  },
];

const autores = [
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Británica" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();
