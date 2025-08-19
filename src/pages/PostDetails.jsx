import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  publicaciones,
  categorias,
  usuarios,
  comentarios as allComentarios,
  etiquetas as allTags,
} from "../mock/data";

export default function PostDetail() {
  const { slug } = useParams();
  const post = useMemo(
    () => publicaciones.find((p) => p.slug === slug),
    [slug]
  );
  const [likes, setLikes] = useState(post?.likes ?? 0);

  if (!post)
    return <div className="alert alert-warning">Publicación no encontrada</div>;

  const category = categorias.find((c) => c.id === post.categoria_id);
  const author = usuarios.find((u) => u.id === post.autor_id);
  const postTags = post.etiquetas
    .map((id) => allTags.find((t) => t.id === id)?.slug)
    .filter(Boolean);
  const comentarios = allComentarios
    .filter((c) => c.publicacion_id === post.id && c.estado === "aprobado")
    .sort((a, b) => new Date(a.creado_at) - new Date(b.creado_at));

  const topLevel = comentarios.filter((c) => !c.padre_id);
  const childrenOf = (id) => comentarios.filter((c) => c.padre_id === id);

  return (
    <>
      <div className="mb-3">
        <h1 className="mb-0">{post.titulo}</h1>
        <div className="text-muted">
          {category?.nombre ?? "Sin categoría"} · por{" "}
          {author?.nombre_usuario ?? "Anónimo"} ·{" "}
          {new Date(post.publicado_at).toLocaleString()}
        </div>
        <div className="d-flex gap-2 mt-2">
          {postTags.map((slug) => (
            <span key={slug} className="badge text-bg-secondary">
              #{slug}
            </span>
          ))}
        </div>
      </div>

      <article className="mb-4">
        <p className="lead">{post.extracto}</p>
        <hr />
        <pre
          className="bg-light p-3 rounded"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {post.contenido_md}
        </pre>
      </article>

      <div className="d-flex align-items-center gap-2 mb-4">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => setLikes((x) => x + 1)}
        >
          ❤️ Me gusta
        </button>
        <span className="text-muted">{likes}</span>
      </div>

      <h4>Comentarios</h4>
      <div className="list-group mb-3">
        {topLevel.length === 0 && (
          <div className="text-muted">Sé el primero en comentar.</div>
        )}
        {topLevel.map((c) => (
          <div key={c.id} className="list-group-item">
            <b>
              {c.usuario_id
                ? usuarios.find((u) => u.id === c.usuario_id)?.nombre_usuario
                : c.autor_nombre ?? "Invitado"}
            </b>
            <div className="small text-muted">
              {new Date(c.creado_at).toLocaleString()}
            </div>
            <p className="mb-1">{c.cuerpo}</p>
            {childrenOf(c.id).map((r) => (
              <div key={r.id} className="mt-2 ps-3 border-start">
                <b>
                  {r.usuario_id
                    ? usuarios.find((u) => u.id === r.usuario_id)
                        ?.nombre_usuario
                    : r.autor_nombre ?? "Invitado"}
                </b>
                <div className="small text-muted">
                  {new Date(r.creado_at).toLocaleString()}
                </div>
                <p className="mb-1">{r.cuerpo}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Form de comentario “mock” */}
      <form className="border rounded p-3">
        <h6 className="mb-3">Agregar comentario (mock)</h6>
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input className="form-control" placeholder="Tu nombre (mock)" />
        </div>
        <div className="mb-2">
          <label className="form-label">Comentario</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Escribe algo… (mock)"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => alert("En producción: POST /comentarios")}
        >
          Publicar
        </button>
      </form>
    </>
  );
}
