const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const BrandCard = require("../components/BrandCard");
const { prisma } = require("../lib/prisma");
const { serialize } = require("../lib/serialize");

function BrandsPage({ siteContent, brands }) {
  const national = brands.filter((brand) => brand.origin === "nacional");
  const imported = brands.filter((brand) => brand.origin === "importado");

  return (
    <Layout siteContent={siteContent} title="Marcas">
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Marcas"
            title="Líneas nacionales e importadas"
            description="Tarjetas descriptivas para comunicar rápido el perfil de cada marca."
          />
        </div>
      </section>

      <section className="section">
        <div className="container brand-columns">
          <div>
            <h2 className="split-title">Nacionales</h2>
            <div className="brand-grid">
              {national.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="split-title">Importadas</h2>
            <div className="brand-grid">
              {imported.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps() {
  const [siteContent, brands] = await Promise.all([
    prisma.siteContent.findFirst(),
    prisma.brand.findMany({ orderBy: [{ origin: "asc" }, { sortOrder: "asc" }] }),
  ]);

  return { props: { siteContent: serialize(siteContent), brands: serialize(brands) } };
}

export { getServerSideProps };
export default BrandsPage;
