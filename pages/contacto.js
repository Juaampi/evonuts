const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const { prisma } = require("../lib/prisma");
const { serialize } = require("../lib/serialize");

function ContactPage({ siteContent }) {
  return (
    <Layout siteContent={siteContent} title="Contacto">
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Contacto"
            title="Hablemos por WhatsApp o dejá tu consulta"
            description="El sitio está pensado para terminar la conversación de forma simple y directa."
          />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <form className="contact-form">
            <label>
              Nombre
              <input type="text" placeholder="Tu nombre" />
            </label>
            <label>
              WhatsApp
              <input type="text" placeholder="Tu número" />
            </label>
            <label>
              Consulta
              <textarea rows="5" placeholder="Contanos qué objetivo tenés o qué producto te interesa" />
            </label>
            <a
              className="btn btn-primary"
              href={`https://wa.me/${siteContent.whatsappNumber}?text=Hola,%20quiero%20hacer%20una%20consulta%20sobre%20suplementos.`}
              target="_blank"
              rel="noreferrer"
            >
              Enviar por WhatsApp
            </a>
          </form>

          <div className="contact-card">
            <h3>Datos del negocio</h3>
            <p>{siteContent.address}</p>
            <p>{siteContent.contactPhone}</p>
            <p>{siteContent.schedule}</p>
            {siteContent.mapEmbedUrl ? (
              <iframe
                src={siteContent.mapEmbedUrl}
                title="Mapa EVONUT"
                loading="lazy"
              />
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps() {
  const siteContent = await prisma.siteContent.findFirst();
  return { props: { siteContent: serialize(siteContent) } };
}

export { getServerSideProps };
export default ContactPage;
