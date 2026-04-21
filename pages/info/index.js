const Layout = require("../../components/Layout");
const SectionTitle = require("../../components/SectionTitle");
const ArticleCard = require("../../components/ArticleCard");
const { articles, siteContent } = require("../../lib/data");

function InfoPage({ siteContent, articles }) {
  return (
    <Layout
      siteContent={siteContent}
      title="Info"
      description="Guías simples sobre proteínas, creatina, running y suplementación."
    >
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Info EVONUT"
            title="Contenido visual y guías rápidas para vender con más claridad"
            description="Acá viven las piezas educativas del proyecto: posts adaptados al sitio para acompañar productos, objetivos y dudas frecuentes."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function getServerSideProps() {
  return {
    props: {
      siteContent,
      articles,
    },
  };
}

export { getServerSideProps };
export default InfoPage;
