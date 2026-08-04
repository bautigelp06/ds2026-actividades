import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  { id: 1, nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { id: 2, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 3, nombre: "George Orwell", nacionalidad: "Británica" },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((a) => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const indice = autores.findIndex((a) => a.id === id);
  if (indice === -1) return undefined;
  autores[indice] = { id, ...datos };
  return autores[indice];
}

export function remove(id: number): boolean {
  const indice = autores.findIndex((a) => a.id === id);
  if (indice === -1) return false;
  autores.splice(indice, 1);
  return true;
}
