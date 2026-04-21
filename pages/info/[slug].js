const Layout = require("../../components/Layout");
const { articles, siteContent } = require("../../lib/data");

function ArticleDetailPage({ siteContent, article }) {
  if (!article) {
    return (
      <Layout siteContent={siteContent} title="Info">
        <section className="page-hero compact">
          <div className="container article-detail">
            <p className="eyebrow">Info EVONUT</p>
            <h1>Contenido no encontrado</h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      siteContent={siteContent}
      title={article.title}
      description={article.excerpt}
    >
      <section className="page-hero compact">
        <div className="container article-detail">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <img className="article-cover" src={article.coverImage} alt={article.title} />
          <div className="article-body">
            {article.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function getServerSideProps({ params }) {
  const article = articles.find((entry) => entry.slug === params.slug) || null;

  return {
    props: {
      siteContent,
      article,
    },
  };
}

export { getServerSideProps };
export default ArticleDetailPage;
