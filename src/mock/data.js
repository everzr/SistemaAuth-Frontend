//Esta clase simula por el momento la informacion de las tablas solo para probar las vistas

// Simula tablas: usuarios, categorias, etiquetas, publicaciones, comentarios, paginas

export const usuarios = [
  { id: 1, nombre_usuario: "rodolfo", email: "rodolfo@demo.com" },
  { id: 2, nombre_usuario: "ana", email: "ana@demo.com" },
];

export const categorias = [
  {
    id: 1,
    nombre: "JavaScript",
    slug: "javascript",
    descripcion: "Tips y guías JS",
  },
  { id: 2, nombre: "Node.js", slug: "nodejs", descripcion: "Backend con Node" },
];

export const etiquetas = [
  { id: 1, nombre: "react", slug: "react" },
  { id: 2, nombre: "express", slug: "express" },
  { id: 3, nombre: "oauth", slug: "oauth" },
];

export const publicaciones = [
  {
    id: 1,
    autor_id: 1,
    categoria_id: 1,
    titulo: "Empezando con React",
    slug: "empezando-con-react",
    extracto: "Crea tu primera app con Vite y React.",
    contenido_md: "## Hola React\nEste es un post de ejemplo en **Markdown**.",
    contenido_html: null,
    estado: "publicado",
    publicado_at: "2025-08-01 10:00:00",
    etiquetas: [1], // react
    likes: 3,
  },
  {
    id: 2,
    autor_id: 2,
    categoria_id: 2,
    titulo: "Autenticación OAuth en Express",
    slug: "oauth-en-express",
    extracto: "Google y GitHub con Passport.",
    contenido_md: "Guía rápida para OAuth en Express con **passport**.",
    contenido_html: null,
    estado: "publicado",
    publicado_at: "2025-08-05 12:00:00",
    etiquetas: [2, 3], // express, oauth
    likes: 5,
  },
];

export const comentarios = [
  {
    id: 1,
    publicacion_id: 1,
    usuario_id: 2,
    autor_nombre: null,
    autor_email: null,
    cuerpo: "¡Excelente!",
    padre_id: null,
    estado: "aprobado",
    creado_at: "2025-08-02 09:00:00",
  },
  {
    id: 2,
    publicacion_id: 1,
    usuario_id: null,
    autor_nombre: "Invitado",
    autor_email: "guest@demo.com",
    cuerpo: "Gracias por compartir",
    padre_id: 1,
    estado: "aprobado",
    creado_at: "2025-08-02 09:10:00",
  },
  {
    id: 3,
    publicacion_id: 2,
    usuario_id: 1,
    autor_nombre: null,
    autor_email: null,
    cuerpo: "Justo lo que necesitaba",
    padre_id: null,
    estado: "aprobado",
    creado_at: "2025-08-06 08:00:00",
  },
];

export const paginas = [
  {
    id: 1,
    titulo: "Acerca de",
    slug: "acerca-de",
    contenido_md: "Somos un blog de prueba.",
    publicado: 1,
    publicado_at: "2025-08-01 00:00:00",
  },
];
