import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  const disponible =
    req.query.disponible === undefined
      ? undefined
      : req.query.disponible === "true";
  const libros = await libroService.findAll(disponible);
  res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const libro = await libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const libro = await libroService.update(Number(req.params.id), req.body);
  res.json(libro);
}

export async function remove(req: Request, res: Response) {
  await libroService.remove(Number(req.params.id));
  res.status(204).send();
}
