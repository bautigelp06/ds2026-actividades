import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerToken, borrarToken } from '../../services/sesion';

export default function Header() {
  const navigate = useNavigate();
  const logueado = !!obtenerToken();

  const handleLogout = () => {
    borrarToken();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">📚 Librería UTN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/libros/nuevo" className="fw-bold text-success">
              + Agregar Libro
            </Nav.Link>
            {logueado ? (
              <Nav.Link onClick={handleLogout} className="fw-bold text-danger" role="button">
                Cerrar sesión
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="fw-bold">
                Iniciar sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
