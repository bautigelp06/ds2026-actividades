import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../context/AuthContext';
import type { Rol, Usuario } from '../types/auth';

function renderRuta(usuario: Usuario | null, cargando = false) {
  const auth = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <MemoryRouter initialEntries={['/libros/nuevo']}>
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/login" element={<p>Página de login</p>} />
          <Route path="/sin-permiso" element={<p>Sin permiso</p>} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<p>Formulario de libro</p>} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe('PrivateRoute con rol ADMIN', () => {
  it('sin sesión redirige a /login', () => {
    renderRuta(null);
    expect(screen.getByText('Página de login')).toBeInTheDocument();
  });

  it('mientras carga la sesión no decide: no redirige ni muestra la página', () => {
    renderRuta(null, true);
    expect(screen.queryByText('Página de login')).not.toBeInTheDocument();
    expect(screen.queryByText('Formulario de libro')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('un CLIENTE va a /sin-permiso', () => {
    renderRuta({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });
    expect(screen.getByText('Sin permiso')).toBeInTheDocument();
  });

  it('un ADMIN ve la página protegida', () => {
    renderRuta({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });
    expect(screen.getByText('Formulario de libro')).toBeInTheDocument();
  });
});
