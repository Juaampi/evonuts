const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const GuideWizard = require("../components/GuideWizard");
const { prisma } = require("../lib/prisma");
const { serialize } = require("../lib/serialize");
const { enhanceProducts } = require("../lib/product-media");

function GuidePage({ siteContent, products }) {
  return (
    <Layout siteContent={siteContent} title="Qué necesitás">
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Asistente EVONUT"
            title="Una guía visual más moderna, clara e interactiva"
            description="Elegí tu objetivo, actividad y prioridad en una experiencia pensada para ordenar la decisión antes de pasar a WhatsApp."
          />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <GuideWizard products={products} whatsappNumber={siteContent.whatsappNumber} />
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps() {
  const [siteContent, products] = await Promise.all([
    prisma.siteContent.findFirst(),
    prisma.product.findMany({
      include: { brand: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return {
    props: {
      siteContent: serialize(siteContent),
      products: serialize(enhanceProducts(products)),
    },
  };
}

export { getServerSideProps };
export default GuidePage;
