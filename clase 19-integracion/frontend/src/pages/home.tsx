import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/librocard';
import { useFetch } from '../hooks/useFetch';
import type { LibroCardProps } from '../types/libro';

export function Home() {
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros');

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-secondary">Cargando novedades...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>¡Uy! Hubo un problema</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  // Mostramos solo los primeros 3 como "Destacados"
  const destacados = (libros ?? []).slice(0, 3);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 fw-bold">Novedades Destacadas</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {destacados.map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
