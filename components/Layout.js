const Head = require("next/head").default;
const Header = require("./Header");
const Footer = require("./Footer");
const FloatingWhatsApp = require("./FloatingWhatsApp");
const SelectionPanel = require("./SelectionPanel");

function Layout({ children, siteContent, title, description }) {
  const metaTitle = title
    ? `${title} | EVONUT Suplementos Deportivos`
    : "EVONUT Suplementos Deportivos";

  const metaDescription =
    description ||
    "Suplementos deportivos, guía por objetivos y asesoramiento comercial por WhatsApp.";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="site-shell">
        <Header />
        <main>{children}</main>
        <SelectionPanel siteContent={siteContent} />
        <Footer siteContent={siteContent} />
        <FloatingWhatsApp siteContent={siteContent} />
      </div>
    </>
  );
}

module.exports = Layout;
