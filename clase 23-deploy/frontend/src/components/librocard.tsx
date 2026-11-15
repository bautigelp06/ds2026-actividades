import { useState } from 'react';
import { Card, Button, Modal, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../services/api';
import type { LibroCardProps } from '../types/libro';

type Props = LibroCardProps & { onEliminado?: (id: number) => void };

export default function LibroCard({ id, titulo, autor, precio, imagen, onEliminado }: Props) {
  const { tieneRol } = useAuth();
  const [likes, setLikes] = useState<number>(0);
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const puedeEliminar = tieneRol('ADMIN') && onEliminado !== undefined;

  const abrirConfirmacion = () => {
    setError(null);
    setConfirmando(true);
  };

  const eliminar = async () => {
    setEliminando(true);
    setError(null);
    try {
      await apiFetch(`/libros/${id}`, { method: 'DELETE' });
      setConfirmando(false);
      onEliminado?.(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo eliminar el libro');
      setEliminando(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img variant="top" src={imagen} style={{ height: '320px', objectFit: 'contain', padding: '15px' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-primary fw-bold fs-5">{titulo}</Card.Title>
        <Card.Text className="mb-1 text-secondary"><strong>Autor:</strong> {autor.nombre}</Card.Text>
        <Card.Text className="fw-bold text-dark fs-5 mt-2">${precio.toLocaleString()}</Card.Text>
        <div className="mt-auto d-grid gap-2">
          <Button
            variant={likes > 0 ? "success" : "outline-primary"}
            onClick={() => setLikes(likes + 1)}
          >
            {likes > 0 ? `🤘 Me gusta (${likes})` : "Dar Me gusta"}
          </Button>
          {puedeEliminar && (
            <Button variant="outline-danger" onClick={abrirConfirmacion}>
              Eliminar
            </Button>
          )}
        </div>
      </Card.Body>

      <Modal show={confirmando} onHide={() => !eliminando && setConfirmando(false)} centered>
        <Modal.Header closeButton={!eliminando}>
          <Modal.Title>Eliminar libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          ¿Seguro que querés eliminar <strong>{titulo}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmando(false)} disabled={eliminando}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminar} disabled={eliminando}>
            {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
