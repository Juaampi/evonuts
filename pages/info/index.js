const Layout = require("../../components/Layout");
const SectionTitle = require("../../components/SectionTitle");
const ArticleCard = require("../../components/ArticleCard");
const { prisma } = require("../../lib/prisma");
const { serialize } = require("../../lib/serialize");

function InfoPage({ siteContent, articles }) {
  return (
    <Layout siteContent={siteContent} title="Info">
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Educación"
            title="Notas orientativas para elegir mejor"
            description="Contenido claro para personas que recién empiezan o quieren ordenar mejor su suplementación."
          />
        </div>
      </section>

      <section className="section">
        <div className="container article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps() {
  const [siteContent, articles] = await Promise.all([
    prisma.siteContent.findFirst(),
    prisma.article.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return {
    props: {
      siteContent: serialize(siteContent),
      articles: serialize(articles),
    },
  };
}

export { getServerSideProps };
export default InfoPage;
