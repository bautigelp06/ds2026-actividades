import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/librocard';
import { useFetch } from '../hooks/useFetch';

export function Catalogo() {
  const { data: libros, loading, error } = useFetch<any[]>('/libros.json');

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-secondary">Cargando catálogo...</p>
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

  return (
    <Container className="my-4">
      <h2 className="mb-4 fw-bold">Catálogo Completo</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {(libros ?? []).map((libro: any) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}