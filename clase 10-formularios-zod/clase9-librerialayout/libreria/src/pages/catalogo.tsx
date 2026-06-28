import { Container, Row, Col } from 'react-bootstrap';
import LibroCard from '../components/librocard';

export function Catalogo({ libros }: { libros: any[] }) {
  return (
    <Container className="my-4">
      <h2 className="mb-4 fw-bold">Catálogo Completo</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}