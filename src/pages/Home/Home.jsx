// src/pages/Home/Home.jsx
import { Link } from "react-router-dom";
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

// Función auxiliar para obtener posts populares (basado en likes)
function getPopularPosts(posts, limit = 5) {
  return [...posts].sort((a, b) => b.likes - a.likes).slice(0, limit);
}

// Función para contar posts por categoría
function getCategoryStats() {
  return categorias
    .map((cat) => ({
      ...cat,
      postCount: publicaciones.filter(
        (p) => p.categoria_id === cat.id && p.estado === "publicado"
      ).length,
    }))
    .filter((cat) => cat.postCount > 0);
}

// Función para obtener tags populares (basado en frecuencia)
function getPopularTags(limit = 10) {
  const tagCounts = {};
  publicaciones.forEach((post) => {
    post.etiquetas.forEach((tagId) => {
      tagCounts[tagId] = (tagCounts[tagId] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id]) => etiquetas.find((e) => e.id === parseInt(id)));
}

export default function Home() {
  const posts = publicaciones
    .filter((p) => p.estado === "publicado")
    .sort((a, b) => new Date(b.publicado_at) - new Date(a.publicado_at));

  const featuredPost = posts[0]; // El más reciente como destacado
  const otherPosts = posts.slice(1, 7); // Limitamos a 6 para no sobrecargar, agregar paginación después
  const popularPosts = getPopularPosts(posts);
  const categoryStats = getCategoryStats();
  const popularTags = getPopularTags();

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
            novedades en nuestro blog comunitario.
          </p>
        </div>

        {/* Stats mejorados con tooltips */}
        <div className="stats-container">
          <div
            className="stat-item"
            title="Número total de publicaciones disponibles"
          >
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item" title="Categorías activas con contenido">
            <span className="stat-number">{categoryStats.length}</span>
            <span className="stat-label">Categorías</span>
          </div>
          <div className="stat-item" title="Autores registrados">
            <span className="stat-number">{usuarios.length}</span>
            <span className="stat-label">Autores</span>
          </div>
          <div className="stat-item" title="Etiquetas únicas utilizadas">
            <span className="stat-number">{etiquetas.length}</span>
            <span className="stat-label">Etiquetas</span>
          </div>
        </div>
      </div>

      <div className="home-content">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay publicaciones aún</h3>
            <p>
              Parece que no hay contenido disponible por el momento. ¡Vuelve
              pronto!
            </p>
            <Link to="/crear-post" className="btn btn-primary mt-3">
              Crear tu primer post
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* Main Content Column */}
            <div className="col-lg-8">
              {/* Featured Post - Mejorado con imagen placeholder */}
              {featuredPost && (
                <div className="featured-section">
                  <h2 className="section-title">
                    <span className="title-badge">✨ Destacado</span>
                  </h2>
                  <div className="featured-post">
                    <img
                      src={`https://picsum.photos/seed/${featuredPost.id}/800/400`}
                      alt={featuredPost.titulo}
                      className="featured-image"
                    />
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

                      <p className="featured-excerpt">
                        {featuredPost.extracto}
                      </p>

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
                          <span className="comments-count">
                            <span className="comment-icon">💬</span>
                            {featuredPost.comentarios?.length || 0}
                          </span>
                        </div>
                      </div>

                      <div className="tags-container">
                        {featuredPost.etiquetas.map((id) => {
                          const tag = etiquetas.find((e) => e.id === id);
                          return (
                            <Link
                              key={id}
                              to={`/etiqueta/${tag?.slug}`}
                              className="tag-pill"
                            >
                              #{tag?.slug}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Posts Grid - Con imágenes */}
              {otherPosts.length > 0 && (
                <div className="posts-section">
                  <h2 className="section-title">
                    <span className="title-badge">📚 Últimos Artículos</span>
                  </h2>

                  <div className="posts-grid">
                    {otherPosts.map((post) => (
                      <article className="post-card" key={post.id}>
                        <img
                          src={`https://picsum.photos/seed/${post.id}/400/250`}
                          alt={post.titulo}
                          className="post-image"
                        />
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
                            {post.etiquetas.slice(0, 3).map((id) => {
                              const tag = etiquetas.find((e) => e.id === id);
                              return (
                                <Link
                                  key={id}
                                  to={`/etiqueta/${tag?.slug}`}
                                  className="tag-pill small"
                                >
                                  #{tag?.slug}
                                </Link>
                              );
                            })}
                            {post.etiquetas.length > 3 && (
                              <span className="tag-more">
                                +{post.etiquetas.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="card-footer">
                          <div className="author-info">
                            <div className="author-avatar small">
                              {authorName(post.autor_id)
                                .charAt(0)
                                .toUpperCase()}
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
                            <span className="comments-count">
                              <span className="comment-icon">💬</span>
                              {post.comentarios?.length || 0}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Paginación simple */}
                  {posts.length > 7 && (
                    <div className="pagination">
                      <button className="btn btn-outline-primary">
                        Anterior
                      </button>
                      <span className="page-info">
                        Página 1 de {Math.ceil(posts.length / 6)}
                      </span>
                      <button className="btn btn-outline-primary">
                        Siguiente
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Column - Nueva sección para enriquecer la vista */}
            <div className="col-lg-4">
              {/* Posts Populares */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <span className="title-icon">🔥</span> Populares
                </h3>
                <ul className="popular-posts-list">
                  {popularPosts.map((post) => (
                    <li key={post.id} className="popular-post-item">
                      <Link to={`/post/${post.slug}`}>
                        <span className="popular-title">{post.titulo}</span>
                        <span className="popular-likes">❤️ {post.likes}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categorías */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <span className="title-icon">📂</span> Categorías
                </h3>
                <ul className="category-list">
                  {categoryStats.map((cat) => (
                    <li key={cat.id} className="category-item">
                      <Link to={`/categoria/${cat.slug}`}>
                        <span
                          className="category-color"
                          style={{ backgroundColor: getCategoryColor(cat.id) }}
                        ></span>
                        {cat.nombre}
                        <span className="post-count">({cat.postCount})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Populares */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <span className="title-icon">🏷️</span> Tags Populares
                </h3>
                <div className="tags-cloud">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag?.id}
                      to={`/etiqueta/${tag?.slug}`}
                      className="tag-cloud-item"
                    >
                      #{tag?.slug}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="sidebar-section cta-section">
                <h3 className="sidebar-title">
                  <span className="title-icon">✍️</span> ¡Únete!
                </h3>
                <p className="cta-text">
                  Comparte tus ideas y forma parte de la comunidad.
                </p>
                <Link to="/registro" className="btn btn-primary w-100 mb-2">
                  Registrarse
                </Link>
                <Link to="/login" className="btn btn-outline-primary w-100">
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
