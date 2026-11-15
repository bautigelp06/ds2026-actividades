import { z } from 'zod';

export const libroSchema = z
  .object({
    titulo: z.string().trim().min(1, 'El título es obligatorio'),
    autorId: z.string().optional(),
    autorNuevo: z.boolean(),
    autorNombre: z.string().trim().optional(),
    autorNacionalidad: z.string().trim().optional(),
    precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
    disponible: z.boolean(),
    imagen: z.string().optional(),
  })
  .superRefine((datos, ctx) => {
    if (datos.autorNuevo) {
      if (!datos.autorNombre) {
        ctx.addIssue({ code: 'custom', path: ['autorNombre'], message: 'El nombre del autor es obligatorio' });
      }
      if (!datos.autorNacionalidad) {
        ctx.addIssue({ code: 'custom', path: ['autorNacionalidad'], message: 'La nacionalidad es obligatoria' });
      }
    } else if (!(Number(datos.autorId) > 0)) {
      ctx.addIssue({ code: 'custom', path: ['autorId'], message: 'Elegí un autor' });
    }
  });

export type LibroValidado = z.infer<typeof libroSchema>;
