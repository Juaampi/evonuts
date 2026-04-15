const Layout = require("../../components/Layout");
const { prisma } = require("../../lib/prisma");
const { serialize } = require("../../lib/serialize");

function ArticleDetailPage({ siteContent, article }) {
  return (
    <Layout siteContent={siteContent} title={article.title} description={article.excerpt}>
      <section className="page-hero compact">
        <div className="container article-detail">
          <span className="eyebrow">{article.category}</span>
          <h1>{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
          <img src={article.coverImage} alt={article.title} className="article-cover" />
          <div className="article-body">
            {article.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="guide-warning">
            Esta información es orientativa y no reemplaza el asesoramiento
            profesional personalizado.
          </p>
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps({ params }) {
  const [siteContent, article] = await Promise.all([
    prisma.siteContent.findFirst(),
    prisma.article.findUnique({ where: { slug: params.slug } }),
  ]);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      siteContent: serialize(siteContent),
      article: serialize(article),
    },
  };
}

export { getServerSideProps };
export default ArticleDetailPage;
