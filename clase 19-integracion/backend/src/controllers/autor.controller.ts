import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  const autores = await autorService.findAll();
  res.json(autores);
}

export async function getById(req: Request, res: Response) {
  const autor = await autorService.findById(Number(req.params.id));
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  res.json(autor);
}

export async function create(req: Request, res: Response) {
  const nuevo = await autorService.create(req.body);
  res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const autor = await autorService.update(Number(req.params.id), req.body);
  res.json(autor);
}

export async function remove(req: Request, res: Response) {
  await autorService.remove(Number(req.params.id));
  res.status(204).send();
}
