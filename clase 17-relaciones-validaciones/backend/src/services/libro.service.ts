import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import { Libro } from "../types/libro.types";
import { LibroCreate, LibroUpdate } from "../validations/libro.validation";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: { disponible },
    include: { autor: true },
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true },
  });
}

export async function create(datos: LibroCreate): Promise<Libro> {
  return prisma.libro.create({ data: datos });
}

export async function update(id: number, datos: LibroUpdate): Promise<Libro> {
  return prisma.libro.update({ where: { id }, data: datos });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}
