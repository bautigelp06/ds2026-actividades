import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LibroNuevo from './libronuevo';

vi.mock('../services/api', async () => {
  const real = await vi.importActual<typeof import('../services/api')>('../services/api');
  return { ...real, apiFetch: vi.fn() };
});

import { apiFetch } from '../services/api';

const autoresExistentes = [{ id: 1, nombre: 'Julio Cortázar', nacionalidad: 'Argentina' }];

function prepararApi(crearAutor?: () => Promise<unknown>) {
  vi.mocked(apiFetch).mockImplementation(async (ruta: string, opciones?: RequestInit) => {
    if (ruta === '/autores' && !opciones?.method) return autoresExistentes;
    if (ruta === '/autores' && opciones?.method === 'POST') {
      return crearAutor ? crearAutor() : { id: 99, nombre: 'Nuevo Autor', nacionalidad: 'Chilena' };
    }
    return { id: 1 };
  });
}

function llamadasPost(ruta: string) {
  return vi.mocked(apiFetch).mock.calls.filter(([r, o]) => r === ruta && o?.method === 'POST');
}

async function renderForm() {
  render(
    <MemoryRouter>
      <LibroNuevo />
    </MemoryRouter>,
  );
  await screen.findByRole('combobox', {}, { timeout: 4000 });
}

describe('LibroNuevo: autores', () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it('crea un autor nuevo y luego el libro con el id del autor creado', async () => {
    prepararApi();
    await renderForm();

    fireEvent.click(screen.getByRole('button', { name: '+ Agregar autor nuevo' }));
    fireEvent.change(await screen.findByPlaceholderText('Nombre del autor'), { target: { value: 'Nuevo Autor' } });
    fireEvent.change(screen.getByPlaceholderText('Nacionalidad'), { target: { value: 'Chilena' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: Rayuela'), { target: { value: 'Libro X' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /Guardar/ }));

    await waitFor(() => expect(llamadasPost('/libros')).toHaveLength(1));
    expect(JSON.parse(String(llamadasPost('/autores')[0][1]?.body))).toEqual({
      nombre: 'Nuevo Autor',
      nacionalidad: 'Chilena',
    });
    expect(JSON.parse(String(llamadasPost('/libros')[0][1]?.body))).toMatchObject({
      titulo: 'Libro X',
      autorId: 99,
      precio: 5000,
    });
  });

  it('exige nombre y nacionalidad cuando se crea un autor nuevo', async () => {
    prepararApi();
    await renderForm();

    fireEvent.click(screen.getByRole('button', { name: '+ Agregar autor nuevo' }));
    fireEvent.change(screen.getByPlaceholderText('Ej: Rayuela'), { target: { value: 'Libro X' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /Guardar/ }));

    expect(await screen.findByText('El nombre del autor es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La nacionalidad es obligatoria')).toBeInTheDocument();
    expect(llamadasPost('/autores')).toHaveLength(0);
  });

  it('con un autor existente no crea ningún autor', async () => {
    prepararApi();
    await renderForm();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    fireEvent.change(screen.getByPlaceholderText('Ej: Rayuela'), { target: { value: 'Libro X' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '5000' } });
    fireEvent.click(screen.getByRole('button', { name: /Guardar/ }));

    await waitFor(() => expect(llamadasPost('/libros')).toHaveLength(1));
    expect(llamadasPost('/autores')).toHaveLength(0);
    expect(JSON.parse(String(llamadasPost('/libros')[0][1]?.body))).toMatchObject({ autorId: 1 });
  });
});
