const Link = require("next/link").default;

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="article-media">
        <img src={article.coverImage || "/images/products/whey-ena.svg"} alt={article.title} />
      </div>
      <div className="article-content">
        <span>{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <Link href={`/info/${article.slug}`}>Leer guía</Link>
      </div>
    </article>
  );
}

module.exports = ArticleCard;
