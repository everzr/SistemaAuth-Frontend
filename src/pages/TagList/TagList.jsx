import { etiquetas, publicaciones } from "../../mock/data";
import "./TagList.css"; // Asegúrate de tener estilos para la lista de etiquetas

export default function TagList() {
  const counts = etiquetas
    .map((t) => ({
      ...t,
      count: publicaciones.filter(
        (p) => p.etiquetas.includes(t.id) && p.estado === "publicado"
      ).length,
    }))
    .sort((a, b) => b.count - a.count); // Ordenar por cantidad descendente

  return (
    <div className="tag-list-container">
      <h1 className="tag-list-title">Etiquetas</h1>
      <div className="tag-list-grid">
        {counts.map((t) => (
          <div key={t.id} className="tag-item">
            <span className="tag-name">#{t.slug}</span>
            <span className="tag-count">{t.count}</span>
          </div>
        ))}
      </div>
      {counts.length === 0 && (
        <p className="tag-list-empty">No hay etiquetas disponibles</p>
      )}
    </div>
  );
}
