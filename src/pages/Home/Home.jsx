// src/pages/Home/Home.jsx
import { BrowserRouter, Link } from "react-router-dom";
import {
  publicaciones,
  categorias,
  etiquetas,
  usuarios,
} from "../../mock/data";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar/Navbar";

function categoryName(id) {
  return categorias.find((c) => c.id === id)?.nombre ?? "Sin categoría";
}

function authorName(id) {
  return usuarios.find((u) => u.id === id)?.nombre_usuario ?? "Anónimo";
}

function getCategoryColor(categoryId) {
  const colors = {
    1: "#6366f1", // Indigo
    2: "#10b981", // Emerald
    3: "#f59e0b", // Amber
    4: "#ef4444", // Red
    5: "#8b5cf6", // Violet
  };
  return colors[categoryId] || "#6b7280"; // Gray por defecto
}

function getTimeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} min`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `hace ${hours}h`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `hace ${days}d`;
  }
}

export default function Home() {
  const posts = publicaciones
    .filter((p) => p.estado === "publicado")
    .sort((a, b) => new Date(b.publicado_at) - new Date(a.publicado_at));

  const featuredPost = posts[0]; // El más reciente como destacado
  const otherPosts = posts.slice(1);

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="home-header">
        <div className="header-content">
          <h1 className="home-title">
            <span className="title-icon">📝</span>
            Últimas Publicaciones
          </h1>
          <p className="home-subtitle">
            Descubre contenido interesante y mantente al día con las últimas
            novedades
          </p>
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categorias.length}</span>
            <span className="stat-label">Categorías</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{usuarios.length}</span>
            <span className="stat-label">Autores</span>
          </div>
        </div>
      </div>

      <div className="home-content">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay publicaciones aún</h3>
            <p>Parece que no hay contenido disponible por el momento.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="featured-section">
                <h2 className="section-title">
                  <span className="title-badge">✨ Destacado</span>
                </h2>
                <div className="featured-post">
                  <div className="featured-content">
                    <div className="post-meta">
                      <span
                        className="category-badge"
                        style={{
                          backgroundColor: getCategoryColor(
                            featuredPost.categoria_id
                          ),
                        }}
                      >
                        {categoryName(featuredPost.categoria_id)}
                      </span>
                      <span className="post-time">
                        {getTimeAgo(featuredPost.publicado_at)}
                      </span>
                    </div>

                    <h3 className="featured-title">
                      <Link to={`/post/${featuredPost.slug}`}>
                        {featuredPost.titulo}
                      </Link>
                    </h3>

                    <p className="featured-excerpt">{featuredPost.extracto}</p>

                    <div className="post-footer">
                      <div className="author-info">
                        <div className="author-avatar">
                          {authorName(featuredPost.autor_id)
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="author-name">
                          por {authorName(featuredPost.autor_id)}
                        </span>
                      </div>

                      <div className="post-stats">
                        <span className="likes-count">
                          <span className="heart-icon">❤️</span>
                          {featuredPost.likes}
                        </span>
                      </div>
                    </div>

                    <div className="tags-container">
                      {featuredPost.etiquetas.slice(0, 3).map((id) => {
                        const tag = etiquetas.find((e) => e.id === id);
                        return (
                          <span key={id} className="tag-pill">
                            #{tag?.slug}
                          </span>
                        );
                      })}
                      {featuredPost.etiquetas.length > 3 && (
                        <span className="tag-more">
                          +{featuredPost.etiquetas.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <div className="posts-section">
                <h2 className="section-title">
                  <span className="title-badge">📚 Más Artículos</span>
                </h2>

                <div className="posts-grid">
                  {otherPosts.map((post) => (
                    <article className="post-card" key={post.id}>
                      <div className="card-header">
                        <div className="post-meta">
                          <span
                            className="category-badge small"
                            style={{
                              backgroundColor: getCategoryColor(
                                post.categoria_id
                              ),
                            }}
                          >
                            {categoryName(post.categoria_id)}
                          </span>
                          <span className="post-time">
                            {getTimeAgo(post.publicado_at)}
                          </span>
                        </div>
                      </div>

                      <div className="card-body">
                        <h4 className="post-title">
                          <Link to={`/post/${post.slug}`}>{post.titulo}</Link>
                        </h4>

                        <p className="post-excerpt">{post.extracto}</p>

                        <div className="tags-container">
                          {post.etiquetas.slice(0, 2).map((id) => {
                            const tag = etiquetas.find((e) => e.id === id);
                            return (
                              <span key={id} className="tag-pill small">
                                #{tag?.slug}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="author-info">
                          <div className="author-avatar small">
                            {authorName(post.autor_id).charAt(0).toUpperCase()}
                          </div>
                          <span className="author-name">
                            {authorName(post.autor_id)}
                          </span>
                        </div>

                        <div className="post-stats">
                          <span className="likes-count">
                            <span className="heart-icon">❤️</span>
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
