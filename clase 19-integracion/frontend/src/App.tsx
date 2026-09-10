import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home';
import { Catalogo } from './pages/catalogo';
import { LibroDetalle } from './pages/librodetalle';
import LibroNuevo from './pages/libronuevo';
import Login from './pages/login';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/nuevo" element={<LibroNuevo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
