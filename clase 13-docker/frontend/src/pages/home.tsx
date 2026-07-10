import { Container, Row, Col } from 'react-bootstrap';
import LibroCard from '../components/librocard';

export function Home({ libros }: { libros: any[] }) {
  // Mostramos solo los primeros 3 como "Destacados"
  const destacados = libros.slice(0, 3);

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