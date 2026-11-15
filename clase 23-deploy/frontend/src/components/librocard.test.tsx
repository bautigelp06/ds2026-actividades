import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LibroCard from './librocard';
import { AuthContext } from '../context/AuthContext';
import type { Rol, Usuario } from '../types/auth';

vi.mock('../services/api', () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from '../services/api';

const libro = {
  id: 7,
  titulo: 'Rayuela',
  autor: { id: 1, nombre: 'Julio Cortázar', nacionalidad: 'Argentina' },
  precio: 7000,
  imagen: 'https://img/r.jpg',
  disponible: true,
};

function renderCard(usuario: Usuario | null, onEliminado?: (id: number) => void) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <AuthContext.Provider value={auth}>
      <LibroCard {...libro} onEliminado={onEliminado} />
    </AuthContext.Provider>,
  );
}

const admin: Usuario = { id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' };
const cliente: Usuario = { id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' };

describe('LibroCard: eliminar', () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it('un ADMIN ve el botón Eliminar', () => {
    renderCard(admin, vi.fn());
    expect(screen.getByRole('button', { name: 'Eliminar' })).toBeInTheDocument();
  });

  it('un CLIENTE no ve el botón Eliminar', () => {
    renderCard(cliente, vi.fn());
    expect(screen.queryByRole('button', { name: 'Eliminar' })).not.toBeInTheDocument();
  });

  it('sin sesión no ve el botón Eliminar', () => {
    renderCard(null, vi.fn());
    expect(screen.queryByRole('button', { name: 'Eliminar' })).not.toBeInTheDocument();
  });

  it('Cancelar no elimina nada', async () => {
    const onEliminado = vi.fn();
    renderCard(admin, onEliminado);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Cancelar' }));
    expect(apiFetch).not.toHaveBeenCalled();
    expect(onEliminado).not.toHaveBeenCalled();
  });

  it('confirmar hace DELETE /libros/:id y avisa al padre', async () => {
    vi.mocked(apiFetch).mockResolvedValue(null);
    const onEliminado = vi.fn();
    renderCard(admin, onEliminado);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Sí, eliminar' }));
    await waitFor(() => expect(onEliminado).toHaveBeenCalledWith(7));
    expect(apiFetch).toHaveBeenCalledWith('/libros/7', { method: 'DELETE' });
  });

  it('si el servidor falla muestra el error y no avisa al padre', async () => {
    vi.mocked(apiFetch).mockRejectedValue(new Error('Hay registros relacionados'));
    const onEliminado = vi.fn();
    renderCard(admin, onEliminado);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Sí, eliminar' }));
    expect(await screen.findByText('Hay registros relacionados')).toBeInTheDocument();
    expect(onEliminado).not.toHaveBeenCalled();
  });
});
