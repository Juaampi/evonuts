const Link = require("next/link").default;

function Footer({ siteContent }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid footer-grid--main">
        <div className="footer-brand-block">
          <img
            className="footer-logo-image"
            src="/images/logo/image.png"
            alt="EVONUT Suplementos Deportivos"
          />
          <p>
            Suplementos deportivos con una experiencia más clara, visual premium y
            consulta directa por WhatsApp.
          </p>
          <div className="footer-links">
            <Link href="/productos">Productos</Link>
            <Link href="/guia">Qué necesitás</Link>
            <Link href="/info">Info</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Atención</p>
          <p>{siteContent?.contactPhone}</p>
          <p>{siteContent?.address}</p>
          <p>{siteContent?.schedule}</p>
        </div>
        <div>
          <p className="footer-title">Importante</p>
          <p>
            La información del sitio es orientativa y no reemplaza el
            asesoramiento profesional personalizado.
          </p>
        </div>
      </div>
    </footer>
  );
}

module.exports = Footer;
