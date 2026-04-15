const { createWhatsAppUrl } = require("../lib/whatsapp");

function FloatingWhatsApp({ siteContent }) {
  const number = siteContent?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const href = createWhatsAppUrl(
    number,
    "Hola, quiero recibir asesoramiento sobre suplementos deportivos."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
    >
      WhatsApp
    </a>
  );
}

module.exports = FloatingWhatsApp;
