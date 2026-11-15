import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';
import { useFetch } from '../hooks/useFetch';
import { apiFetch, ApiError } from '../services/api';
import type { Autor } from '../types/libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const { data: autores, loading: cargandoAutores } = useFetch<Autor[]>('/autores');
  const [autoresCreados, setAutoresCreados] = useState<Autor[]>([]);
  const listaAutores = [...(autores ?? []), ...autoresCreados];

  // RHF + Zod: ¡Magia pura!
  const { register, handleSubmit, watch, setValue, clearErrors, formState: { errors, isSubmitting } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema) as any,
    defaultValues: { disponible: true, autorNuevo: false },
  });

  const autorNuevo = watch('autorNuevo');

  const alternarAutorNuevo = () => {
    clearErrors();
    setValue('autorNuevo', !autorNuevo);
  };

  const onSubmit = async (data: LibroValidado) => {
    setErrorServidor(null);
    try {
      let autorId = Number(data.autorId);

      if (data.autorNuevo) {
        let creado: Autor;
        try {
          creado = await apiFetch<Autor>('/autores', {
            method: 'POST',
            body: JSON.stringify({ nombre: data.autorNombre, nacionalidad: data.autorNacionalidad }),
          });
        } catch (e) {
          if (e instanceof ApiError && e.status === 409) {
            throw new Error('Ya existe un autor con ese nombre. Elegilo de la lista.');
          }
          throw e;
        }
        autorId = creado.id;
        setAutoresCreados((previos) => [...previos, creado]);
        setValue('autorId', String(creado.id));
        setValue('autorNuevo', false);
      }

      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          autorId,
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
          <div className="d-flex justify-content-between align-items-center">
            <Form.Label className="mb-0">Autor</Form.Label>
            <Button variant="link" size="sm" className="p-0" onClick={alternarAutorNuevo}>
              {autorNuevo ? 'Elegir un autor existente' : '+ Agregar autor nuevo'}
            </Button>
          </div>

          {autorNuevo ? (
            <div className="mt-2">
              <Form.Control
                {...register('autorNombre')}
                isInvalid={!!errors.autorNombre}
                placeholder="Nombre del autor"
                className="mb-2"
              />
              <Form.Control.Feedback type="invalid" className="d-block mb-2">
                {errors.autorNombre?.message}
              </Form.Control.Feedback>
              <Form.Control
                {...register('autorNacionalidad')}
                isInvalid={!!errors.autorNacionalidad}
                placeholder="Nacionalidad"
              />
              <Form.Control.Feedback type="invalid">
                {errors.autorNacionalidad?.message}
              </Form.Control.Feedback>
            </div>
          ) : cargandoAutores ? (
            <div className="mt-2"><Spinner animation="border" size="sm" /></div>
          ) : (
            <>
              <Form.Select
                {...register('autorId')}
                isInvalid={!!errors.autorId}
                defaultValue=""
                className="mt-2"
              >
                <option value="" disabled>Elegí un autor</option>
                {listaAutores.map((autor) => (
                  <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.autorId?.message}
              </Form.Control.Feedback>
            </>
          )}
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
