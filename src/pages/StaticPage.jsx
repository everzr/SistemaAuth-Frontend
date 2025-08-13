import { useParams } from "react-router-dom";
import { paginas } from "../mock/data";

export default function StaticPage() {
  const { slug } = useParams();
  const page = paginas.find((p) => p.slug === slug && p.publicado);

  if (!page)
    return <div className="alert alert-warning">Página no encontrada</div>;

  return (
    <>
      <h1>{page.titulo}</h1>
      <hr />
      <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
        {page.contenido_md}
      </pre>
    </>
  );
}
