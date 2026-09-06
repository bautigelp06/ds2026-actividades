import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';

interface Props {
  onAgregar: (libro: any) => void;
}

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro+Nuevo';

export default function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();
  
  // RHF + Zod: ¡Magia pura!
  const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({ 
    resolver: zodResolver(libroSchema) as any,
    defaultValues: { disponible: true }
  });

  const onSubmit = (data: LibroValidado) => {
    // Si llegamos acá, Zod ya validó todo
    onAgregar({
      id: Date.now(), // ID temporal
      titulo: data.titulo,
      autor: data.autor,
      precio: data.precio,
      imagen: IMG_PLACEHOLDER,
      disponible: data.disponible,
    });
    
    // Redirigir al catálogo después de guardar
    navigate('/catalogo');
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo Libro</h2>
      
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
          <Form.Control 
            {...register('autor')} 
            isInvalid={!!errors.autor} 
            placeholder="Ej: Julio Cortázar"
          />
          <Form.Control.Feedback type="invalid">
            {errors.autor?.message}
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

        <Button variant="primary" type="submit" className="w-100">
          Guardar y Agregar al Catálogo
        </Button>
      </Form>
    </Container>
  );
}