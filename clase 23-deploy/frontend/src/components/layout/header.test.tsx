import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import { AuthContext } from '../../context/AuthContext';
import type { Rol, Usuario } from '../../types/auth';

function renderHeader(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe('Header según la sesión', () => {
  it('sin sesión: muestra "Ingresar" y no muestra "Nuevo libro" ni "Salir"', () => {
    renderHeader(null);
    expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.queryByText(/Nuevo libro/)).not.toBeInTheDocument();
    expect(screen.queryByText('Salir')).not.toBeInTheDocument();
  });

  it('CLIENTE: saluda por nombre, puede salir y NO ve "Nuevo libro"', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });
    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.getByText('Salir')).toBeInTheDocument();
    expect(screen.queryByText(/Nuevo libro/)).not.toBeInTheDocument();
    expect(screen.queryByText('Ingresar')).not.toBeInTheDocument();
  });

  it('ADMIN: ve el link "Nuevo libro" hacia /libros/nuevo', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });
    expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Nuevo libro/ })).toHaveAttribute('href', '/libros/nuevo');
  });
});
