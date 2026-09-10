import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginValidado } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import type { Sesion } from '../types/auth';

export default function Login() {
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (datos: LoginValidado) => {
    setErrorServidor(null);
    try {
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      guardarToken(sesion.token);
      navigate('/catalogo');
    } catch (e) {
      setErrorServidor(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Iniciar sesión</h2>

      {errorServidor && <Alert variant="danger">{errorServidor}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email')}
            isInvalid={!!errors.email}
            placeholder="admin@libreria.test"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            {...register('password')}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Form>
    </Container>
  );
}
