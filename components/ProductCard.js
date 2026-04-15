const Link = require("next/link").default;
const { useSelection } = require("../lib/selection-context");
const { createProductMessage, createWhatsAppUrl } = require("../lib/whatsapp");

function ProductCard({ product, whatsappNumber }) {
  const { addItem, hasItem } = useSelection();
  const inSelection = hasItem(product.id);
  const productUrl = createWhatsAppUrl(
    whatsappNumber,
    createProductMessage(product.name)
  );

  return (
    <article className={`product-card accent-${product.accent || "cyan"}`}>
      <div className="product-image">
        <div className="product-image__glow" />
        <Link href={`/productos/${product.slug}`} className="product-image__link">
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="product-overline">
          <span>{product.brand.name}</span>
          <span>{product.type}</span>
        </div>
      </div>
      <div className="product-content">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.primaryGoal}</span>
        </div>
        <Link href={`/productos/${product.slug}`} className="product-title-link">
          <h3>{product.name}</h3>
        </Link>
        <p>{product.shortDescription}</p>
        <div className="product-bottom">
          <strong className="product-price">${product.price.toLocaleString("es-AR")}</strong>
          <small>Ideal para {product.primaryGoal.toLowerCase()}</small>
        </div>
        <div className="product-actions">
          <button
            type="button"
            className="btn btn-primary product-button-main"
            onClick={() => addItem(product)}
            disabled={inSelection}
          >
            {inSelection ? "Agregado" : "Agregar"}
          </button>
          <a
            href={productUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

module.exports = ProductCard;
