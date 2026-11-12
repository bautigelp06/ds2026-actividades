import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/layout';
import PrivateRoute from './components/PrivateRoute';
import { Home } from './pages/home';
import { Catalogo } from './pages/catalogo';
import { LibroDetalle } from './pages/librodetalle';
import LibroNuevo from './pages/libronuevo';
import Login from './pages/login';
import SinPermiso from './pages/sinpermiso';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route element={<PrivateRoute rol="ADMIN" />}>
            <Route path="/libros/nuevo" element={<LibroNuevo />} />
          </Route>
          <Route path="/libros/:id" element={<LibroDetalle />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
