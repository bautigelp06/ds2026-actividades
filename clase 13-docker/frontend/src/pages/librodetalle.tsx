import { Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="text-center py-5">
      <h1 className="fw-bold text-primary">Detalle del libro ID: {id}</h1>
      <p className="text-muted mt-3">Acá se mostraría la información completa del libro {id}.</p>
     <Link to={`/catalogo/${id}`} className="btn btn-primary">
            Ver más
          </Link>
    </Container>
  );
}