import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SinPermiso() {
  return (
    <Container className="py-5 text-center" style={{ maxWidth: 560 }}>
      <Alert variant="warning">
        <Alert.Heading>Sin permiso</Alert.Heading>
        <p className="mb-0">No tenés permisos para acceder a esta página.</p>
      </Alert>
      <Link to="/catalogo" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </Container>
  );
}
