const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const { siteContent } = require("../lib/data");

function BrandsPage({ siteContent }) {
  return (
    <Layout siteContent={siteContent} title="Marcas">
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Marcas"
            title="Marcas EVONUT"
            description="Acá mostramos la pieza visual completa para resumir las líneas que trabaja EVONUT dentro del proyecto."
          />
          <div className="brand-feature-banner">
            <img
              src="/images/campaigns/brands-nationales.png"
              alt="Marcas EVONUT"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function getServerSideProps() {
  return { props: { siteContent } };
}

export { getServerSideProps };
export default BrandsPage;
