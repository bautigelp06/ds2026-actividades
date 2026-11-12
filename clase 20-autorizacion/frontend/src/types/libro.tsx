export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
};

export type LibroCardProps = {
  id: number;
  titulo: string;
  autor: Autor;
  precio: number;
  imagen: string;
  disponible: boolean;
};
