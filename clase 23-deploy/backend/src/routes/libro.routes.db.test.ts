// Estos tests necesitan la base de datos levantada (docker compose up -d db) y el seed cargado.
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { prisma } from "../config/prisma";
import { JWT_SECRET } from "../config/env";

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
const creados: number[] = [];

afterAll(async () => {
  await prisma.libro.deleteMany({ where: { id: { in: creados } } });
  await prisma.$disconnect();
});

describe("libros con base de datos", () => {
  it("GET /api/libros → 200 con el autor anidado", async () => {
    const res = await request(app).get("/api/libros");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("autor.nombre");
  });

  it("GET /api/libros/999999 → 404", async () => {
    const res = await request(app).get("/api/libros/999999");
    expect(res.status).toBe(404);
  });

  it("POST de ADMIN con un libro válido → 201", async () => {
    const autor = await prisma.autor.findFirstOrThrow();
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ titulo: "Rayuela de prueba", precio: 7000, imagen: "https://img/r.jpg", autorId: autor.id });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ titulo: "Rayuela de prueba", precio: 7000 });
    creados.push(res.body.id);
  });
});
