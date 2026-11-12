import { describe, it, expect } from "vitest";
import { libroCreateSchema } from "./libro.validation";

const libroValido = { titulo: "Rayuela", precio: 7000, imagen: "https://img/r.jpg", autorId: 1 };

describe("libroCreateSchema", () => {
  it("acepta un libro válido", () => {
    const r = libroCreateSchema.safeParse(libroValido);
    expect(r.success).toBe(true);
  });

  it("rechaza precio negativo", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, precio: -5 });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["precio"]);
  });

  it("rechaza un título vacío", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "   " });
    expect(r.success).toBe(false);
  });

  it("recorta espacios del título", () => {
    const r = libroCreateSchema.safeParse({ ...libroValido, titulo: "  Rayuela  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.titulo).toBe("Rayuela");
  });
});
