/** Modelo de una publicación del blog dinámico */
export interface PostBlog {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  destacado: boolean;
}
