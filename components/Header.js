const Link = require("next/link").default;
const { useRouter } = require("next/router");
const { useState } = require("react");

const links = [
  { href: "/", label: "Home" },
  { href: "/productos", label: "Productos" },
  { href: "/guia", label: "Qué necesitás" },
  { href: "/info", label: "Info" },
  { href: "/marcas", label: "Marcas" },
  { href: "/contacto", label: "Contacto" },
];

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") return router.pathname === href;
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark">
          <img
            className="brand-logo-image"
            src="/images/logo/image.png"
            alt="EVONUT Suplementos Deportivos"
          />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${isOpen ? "open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={isActive(link.href) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5492944200000?text=Hola,%20quiero%20asesoramiento%20sobre%20suplementos."
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

module.exports = Header;
