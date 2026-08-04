import express from "express";

const app = express();
const PORT = 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
}

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

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería" });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
