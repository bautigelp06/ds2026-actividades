import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';
import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../services/api';
import type { Autor } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const { data: autores, loading: cargandoAutores } = useFetch<Autor[]>('/autores');

  // RHF + Zod: ¡Magia pura!
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema) as any,
    defaultValues: { disponible: true },
  });

  const onSubmit = async (data: LibroValidado) => {
    setErrorServidor(null);
    try {
      // Si llegamos acá, Zod ya validó todo
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          autorId: data.autorId,
          precio: data.precio,
          imagen: data.imagen || IMG_PLACEHOLDER,
          disponible: data.disponible,
        }),
      });

      // Redirigir al catálogo después de guardar
      navigate('/catalogo');
    } catch (e) {
      setErrorServidor(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo Libro</h2>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            {...register('titulo')}
            isInvalid={!!errors.titulo}
            placeholder="Ej: Rayuela"
          />
          <Form.Control.Feedback type="invalid">
            {errors.titulo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          {cargandoAutores ? (
            <div><Spinner animation="border" size="sm" /></div>
          ) : (
            <Form.Select
              {...register('autorId')}
              isInvalid={!!errors.autorId}
              defaultValue=""
            >
              <option value="" disabled>Elegí un autor</option>
              {(autores ?? []).map((autor) => (
                <option key={autor.id} value={autor.id}>{autor.nombre}</option>
              ))}
            </Form.Select>
          )}
          <Form.Control.Feedback type="invalid">
            {errors.autorId?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            {...register('precio')}
            isInvalid={!!errors.precio}
          />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-4"
          label="Disponible para venta"
          {...register('disponible')}
        />

        <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar y Agregar al Catálogo'}
        </Button>
      </Form>
    </Container>
  );
}
