const Link = require("next/link").default;

function Hero({ siteContent, featuredProducts = [] }) {
  const spotlight = featuredProducts.slice(0, 3);

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{siteContent.heroSubtitle}</p>
          <h1>
            Suplementación clara, estética premium y asesoramiento que convierte.
          </h1>
          <p className="hero-text">{siteContent.heroDescription}</p>
          <div className="hero-actions">
            <Link href="/productos" className="btn btn-primary">
              {siteContent.heroPrimaryCta}
            </Link>
            <Link href="/guia" className="btn btn-secondary">
              {siteContent.heroSecondaryCta}
            </Link>
          </div>
          <div className="hero-inline-metrics">
            <div>
              <strong>Catálogo guiado</strong>
              <span>Por objetivo, disciplina y prioridad</span>
            </div>
            <div>
              <strong>Consulta directa</strong>
              <span>WhatsApp como cierre comercial principal</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-logo-panel">
            <img
              src="/images/logo/intentodelogo.png"
              alt="EVONUT Suplementos Deportivos"
            />
          </div>
          <div className="hero-stack">
            {spotlight.map((product) => (
              <article className="hero-product-chip" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <span>{product.brand.name}</span>
                  <strong>{product.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

module.exports = Hero;
