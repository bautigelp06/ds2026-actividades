import { Container, Row, Col } from 'react-bootstrap';
import LibroCard from '../components/librocard';

export function Catalogo() {
  const catalogoCompleto = [
    { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 28500, imagen: "https://covers.openlibrary.org/b/id/8259441-L.jpg" },
    { id: 2, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 19400, imagen: "https://covers.openlibrary.org/b/id/8381896-L.jpg" },
    { id: 3, titulo: "1984", autor: "George Orwell", precio: 16800, imagen: "https://covers.openlibrary.org/b/id/12648505-L.jpg" }
  ];

  return (
    <Container className="my-4">
      <h2 className="mb-4 fw-bold">Catálogo Completo</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {catalogoCompleto.map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}