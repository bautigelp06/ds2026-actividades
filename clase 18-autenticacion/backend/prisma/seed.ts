import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma";

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" },
];

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
  // Idempotente: upsert por email. Correr el seed dos veces no explota.
  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: { ...datos, passwordHash: await bcrypt.hash(password, 10) },
    });
  }

  for (const autor of autores) {
    await prisma.autor.upsert({ where: { nombre: autor.nombre }, update: {}, create: autor });
  }

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
  }

  for (const { autor, cats, ...datos } of libros) {
    const existe = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (existe) continue;
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
