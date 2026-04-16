const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const GuideWizard = require("../components/GuideWizard");
const { products, siteContent } = require("../lib/data");

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

function getServerSideProps() {
  return {
    props: {
      siteContent,
      products,
    },
  };
}

export { getServerSideProps };
export default GuidePage;
