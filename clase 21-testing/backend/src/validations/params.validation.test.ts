import { describe, it, expect } from "vitest";
import { idParamSchema } from "./params.validation";

describe("idParamSchema", () => {
  it("convierte el id de la URL a número", () => {
    const r = idParamSchema.safeParse({ id: "42" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.id).toBe(42);
  });

  it("rechaza un id que no es un número positivo", () => {
    expect(idParamSchema.safeParse({ id: "abc" }).success).toBe(false);
    expect(idParamSchema.safeParse({ id: "-3" }).success).toBe(false);
  });
});
