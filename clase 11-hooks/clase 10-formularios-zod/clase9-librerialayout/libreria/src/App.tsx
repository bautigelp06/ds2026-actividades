import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home';
import { Catalogo } from './pages/catalogo';
import { LibroDetalle } from './pages/librodetalle';
import LibroNuevo from './pages/libronuevo';

export default function App() {
  // El catálogo inicial ahora es estado
  const [libros, setLibros] = useState([
    { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 28500, imagen: "https://covers.openlibrary.org/b/id/8259441-L.jpg" },
    { id: 2, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 19400, imagen: "https://covers.openlibrary.org/b/id/8381896-L.jpg" },
    { id: 3, titulo: "1984", autor: "George Orwell", precio: 16800, imagen: "https://covers.openlibrary.org/b/id/12648505-L.jpg" }
  ]);

  // Función para agregar sin mutar
  const agregarLibro = (nuevo: any) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}