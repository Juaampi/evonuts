const Layout = require("../../components/Layout");
const ProductCard = require("../../components/ProductCard");
const { prisma } = require("../../lib/prisma");
const { serialize } = require("../../lib/serialize");
const {
  enhanceProducts,
  withProductMedia,
} = require("../../lib/product-media");
const {
  createProductMessage,
  createWhatsAppUrl,
} = require("../../lib/whatsapp");

function ProductDetailPage({ siteContent, product, relatedProducts }) {
  const whatsappUrl = createWhatsAppUrl(
    siteContent.whatsappNumber,
    createProductMessage(product.name)
  );

  return (
    <Layout siteContent={siteContent} title={product.name} description={product.shortDescription}>
      <section className="page-hero product-detail-hero">
        <div className="container product-detail-grid">
          <div className={`product-detail-media accent-${product.accent || "cyan"}`}>
            <div className="product-detail-media__glow" />
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-copy">
            <p className="eyebrow">{product.brand.name}</p>
            <h1>{product.name}</h1>
            <div className="detail-tags">
              <span>{product.category}</span>
              <span>{product.type}</span>
              <span>{product.primaryGoal}</span>
            </div>
            <p className="hero-text">{product.shortDescription}</p>
            <strong className="detail-price">${product.price.toLocaleString("es-AR")}</strong>
            <div className="product-actions">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Consultar por WhatsApp
              </a>
              <a href="/productos" className="btn btn-outline">
                Volver al catálogo
              </a>
            </div>
            <div className="detail-panels">
              <div className="detail-panel">
                <span>Para qué sirve</span>
                <p>{product.longDescription}</p>
              </div>
              <div className="detail-panel">
                <span>Cómo puede ayudarte</span>
                <p>
                  Puede ser una buena opción si tu prioridad hoy es{" "}
                  <strong>{product.primaryGoal.toLowerCase()}</strong>, siempre dentro
                  de una estrategia más amplia de entrenamiento, comida y descanso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <p className="eyebrow">Relacionados</p>
            <h2>Productos que suelen complementar esta elección</h2>
          </div>
          <div className="product-grid">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                product={related}
                whatsappNumber={siteContent.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

async function getServerSideProps({ params }) {
  const [siteContent, product, relatedProducts] = await Promise.all([
    prisma.siteContent.findFirst(),
    prisma.product.findUnique({
      where: { slug: params.slug },
      include: { brand: true },
    }),
    prisma.product.findMany({
      where: {
        slug: { not: params.slug },
      },
      include: { brand: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
  ]);

  if (!product) {
    return { notFound: true };
  }

  const enrichedProduct = withProductMedia(product);
  const enrichedRelated = enhanceProducts(
    relatedProducts.filter(
      (item) =>
        item.category === product.category || item.primaryGoal === product.primaryGoal
    )
  );

  return {
    props: {
      siteContent: serialize(siteContent),
      product: serialize(enrichedProduct),
      relatedProducts: serialize(
        enrichedRelated.length ? enrichedRelated : enhanceProducts(relatedProducts)
      ),
    },
  };
}

export { getServerSideProps };
export default ProductDetailPage;
