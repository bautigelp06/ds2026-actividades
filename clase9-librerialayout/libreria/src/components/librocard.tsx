import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/libro';

export default function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img variant="top" src={imagen} style={{ height: '320px', objectFit: 'contain', padding: '15px' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-primary fw-bold fs-5">{titulo}</Card.Title>
        <Card.Text className="mb-1 text-secondary"><strong>Autor:</strong> {autor}</Card.Text>
        <Card.Text className="fw-bold text-dark fs-5 mt-2">${precio.toLocaleString()}</Card.Text>
        <div className="mt-auto d-flex flex-column gap-2">
          <Button 
            variant={likes > 0 ? "success" : "outline-primary"} 
            onClick={() => setLikes(likes + 1)}
          >
            {likes > 0 ? `🤘 Me gusta (${likes})` : "Dar Me gusta"}
          </Button>
         <Link to={`/libros/${id}`} className="btn btn-primary">
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}