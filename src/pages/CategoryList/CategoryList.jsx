import { Link } from "react-router-dom";
import { categorias, publicaciones } from "../../mock/data";
import "./CategoryList.css";

function getCategoryIcon(categoryName) {
  const icons = {
    Tecnología: "💻",
    Ciencia: "🔬",
    Arte: "🎨",
    Deportes: "⚽",
    Música: "🎵",
    Viajes: "✈️",
    Cocina: "👨‍🍳",
    Salud: "💊",
    Educación: "📚",
    Negocios: "💼",
    Política: "🏛️",
    Entretenimiento: "🎬",
  };
  return icons[categoryName] || "📂";
}

function getCategoryColor(index) {
  const colors = [
    "#6366f1", // Indigo
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
    "#ec4899", // Pink
    "#64748b", // Slate
  ];
  return colors[index % colors.length];
}

function getCategoryGradient(index) {
  const gradients = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #f59e0b, #d97706)",
    "linear-gradient(135deg, #ef4444, #dc2626)",
    "linear-gradient(135deg, #8b5cf6, #a855f7)",
    "linear-gradient(135deg, #06b6d4, #0891b2)",
    "linear-gradient(135deg, #84cc16, #65a30d)",
    "linear-gradient(135deg, #f97316, #ea580c)",
    "linear-gradient(135deg, #ec4899, #db2777)",
    "linear-gradient(135deg, #64748b, #475569)",
  ];
  return gradients[index % gradients.length];
}

export default function CategoryList() {
  const categoriesWithCounts = categorias
    .map((cat) => {
      const count = publicaciones.filter(
        (p) => p.categoria_id === cat.id && p.estado === "publicado"
      ).length;
      return { ...cat, count };
    })
    .sort((a, b) => b.count - a.count); // Ordenar por cantidad de posts

  const totalPosts = publicaciones.filter(
    (p) => p.estado === "publicado"
  ).length;
  const totalCategories = categorias.length;
  const avgPostsPerCategory = Math.round(totalPosts / totalCategories);

  return (
    <div className="category-container">
      {/* Header Section */}
      <div className="category-header">
        <div className="header-content">
          <h1 className="category-title">
            <span className="title-icon">📁</span>
            Explorar Categorías
          </h1>
          <p className="category-subtitle">
            Descubre contenido organizado por temas que te interesan
          </p>
        </div>

        {/* Stats */}
        <div className="category-stats">
          <div className="stat-card">
            <span className="stat-number">{totalCategories}</span>
            <span className="stat-label">Categorías</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{totalPosts}</span>
            <span className="stat-label">Posts Totales</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{avgPostsPerCategory}</span>
            <span className="stat-label">Promedio por Categoría</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-section">
        <h2 className="section-title">
          <span className="title-badge">🎯 Todas las Categorías</span>
        </h2>

        <div className="categories-grid">
          {categoriesWithCounts.map((cat, index) => (
            <div
              className="category-card"
              key={cat.id}
              style={{ "--category-gradient": getCategoryGradient(index) }}
            >
              <div className="category-header-card">
                <div
                  className="category-icon"
                  style={{ background: getCategoryGradient(index) }}
                >
                  {getCategoryIcon(cat.nombre)}
                </div>
                <div className="category-count">
                  <span className="count-number">{cat.count}</span>
                  <span className="count-label">posts</span>
                </div>
              </div>

              <div className="category-body">
                <h3 className="category-name">{cat.nombre}</h3>
                <p className="category-description">
                  {cat.descripcion || "Explora este tema fascinante"}
                </p>

                <div className="category-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          (cat.count /
                            Math.max(
                              ...categoriesWithCounts.map((c) => c.count)
                            )) *
                            100,
                          100
                        )}%`,
                        background: getCategoryGradient(index),
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {cat.count > 0
                      ? `${Math.round(
                          (cat.count / totalPosts) * 100
                        )}% del contenido`
                      : "Sin contenido aún"}
                  </span>
                </div>
              </div>

              <div className="category-footer">
                <Link
                  to={`/?cat=${cat.slug}`}
                  className="explore-link"
                  style={{ background: getCategoryGradient(index) }}
                >
                  <span>Explorar</span>
                  <svg className="link-arrow" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="navigation-section">
        <h2 className="section-title">
          <span className="title-badge">🚀 Navegación Rápida</span>
        </h2>

        <div className="quick-nav">
          <div className="nav-grid">
            {categoriesWithCounts.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/?cat=${cat.slug}`}
                className="nav-item"
                style={{ "--hover-color": getCategoryColor(index) }}
              >
                <div className="nav-icon">{getCategoryIcon(cat.nombre)}</div>
                <div className="nav-content">
                  <span className="nav-name">{cat.nombre}</span>
                  <span className="nav-count">{cat.count} artículos</span>
                </div>
                <div className="nav-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      {categoriesWithCounts.filter((cat) => cat.count > 0).length > 0 && (
        <div className="popular-section">
          <h2 className="section-title">
            <span className="title-badge">🔥 Más Populares</span>
          </h2>

          <div className="popular-list">
            {categoriesWithCounts
              .filter((cat) => cat.count > 0)
              .slice(0, 5)
              .map((cat, index) => (
                <div key={cat.id} className="popular-item">
                  <div className="popular-rank">#{index + 1}</div>
                  <div
                    className="popular-icon"
                    style={{ background: getCategoryGradient(index) }}
                  >
                    {getCategoryIcon(cat.nombre)}
                  </div>
                  <div className="popular-content">
                    <h4 className="popular-name">{cat.nombre}</h4>
                    <p className="popular-desc">
                      {cat.descripcion || "Categoría popular"}
                    </p>
                  </div>
                  <div className="popular-stats">
                    <div className="popular-count">{cat.count}</div>
                    <div className="popular-label">posts</div>
                  </div>
                  <Link
                    to={`/?cat=${cat.slug}`}
                    className="popular-link"
                    style={{ color: getCategoryColor(index) }}
                  >
                    Ver →
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
