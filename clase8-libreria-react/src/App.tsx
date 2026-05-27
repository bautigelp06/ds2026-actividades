import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col, Card, Button } from 'react-bootstrap';

function NavbarLibreria() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand href="#home">📚 Librería UTN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <Container>
        <p className="mb-0">© 2026 Librería UTN - Desarrollo de Software</p>
      </Container>
    </footer>
  );
}

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
};

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img variant="top" src={imagen} style={{ height: '320px', objectFit: 'contain', padding: '15px' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-primary fw-bold fs-5">{titulo}</Card.Title>
        <Card.Text className="mb-1 text-secondary"><strong>Autor:</strong> {autor}</Card.Text>
        <Card.Text className="fw-bold text-dark fs-5 mt-2">${precio.toLocaleString()}</Card.Text>
        <div className="mt-auto">
          <Button 
            variant={likes > 0 ? "success" : "outline-primary"} 
            className="w-100"
            onClick={() => setLikes(likes + 1)}
          >
            {likes > 0 ? `🤘 Me gusta (${likes})` : "Dar Me gusta"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function App() {
  const catalogo = [
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      precio: 28500,
      imagen: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/725865-3fe5b2fc0395fe892217513906652764-1024-1024.webp"
    },
    {
      id: 2,
      titulo: "Ficciones",
      autor: "Jorge Luis Borges",
      precio: 19400,
      imagen: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/526756-9eb49f2d3cd632412417273546134803-640-0.webp"
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      precio: 16800,
      imagen: "https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/67fcc5877c2ce126c48a577d_kAxP6D4zENBke6sSNA999xECBKUBoZET9M_WkMJrkVQ.jpeg"
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarLibreria />
      
      <Container className="my-4">
        <h2 className="text-center mb-4 fw-bold">Novedades Destacadas</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {catalogo.map((libro) => (
            <Col key={libro.id}>
              <LibroCard 
                titulo={libro.titulo}
                autor={libro.autor}
                precio={libro.precio}
                imagen={libro.imagen}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default App;