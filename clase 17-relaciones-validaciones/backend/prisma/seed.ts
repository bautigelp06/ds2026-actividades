import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Británica" },
];

const categorias = [{ nombre: "Novela" }, { nombre: "Ensayo" }, { nombre: "Distopía" }];

const libros = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 28500,
    imagen: "https://covers.openlibrary.org/b/id/8259441-L.jpg",
    disponible: true,
    cats: ["Novela"],
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 19400,
    imagen: "https://covers.openlibrary.org/b/id/8381896-L.jpg",
    disponible: true,
    cats: ["Ensayo"],
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    precio: 16800,
    imagen: "https://covers.openlibrary.org/b/id/12648505-L.jpg",
    disponible: true,
    cats: ["Novela", "Distopía"],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main();
