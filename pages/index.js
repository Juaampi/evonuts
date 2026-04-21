const Layout = require("../components/Layout");
const Hero = require("../components/Hero");
const SectionTitle = require("../components/SectionTitle");
const ProductCard = require("../components/ProductCard");
const GuideWizard = require("../components/GuideWizard");
const ArticleCard = require("../components/ArticleCard");
const CategoryCard = require("../components/CategoryCard");
const CampaignCard = require("../components/CampaignCard");
const { products, brands, articles, campaigns, siteContent } = require("../lib/data");

function HomePage({ siteContent, featuredProducts, allProducts, brands, articles, campaigns }) {
  const categoryHighlights = [
    {
      title: "Suplementos nacionales",
      kicker: "Origen",
      count: "Top sellers",
      description: "Selección con marcas conocidas, fuerte relación precio-rendimiento y llegada rápida.",
      href: "/productos",
      tone: "tone-cyan",
    },
    {
      title: "Importados",
      kicker: "Premium",
      count: "Black line",
      description: "Opciones con perfil más técnico y estética high performance para catálogo premium.",
      href: "/productos",
      tone: "tone-silver",
    },
    {
      title: "Proteínas",
      kicker: "Base",
      count: "Daily protein",
      description: "Para cubrir proteína diaria, recuperación y etapas de masa muscular o definición.",
      href: "/productos",
      tone: "tone-blue",
    },
    {
      title: "Creatinas",
      kicker: "Fuerza",
      count: "Power output",
      description: "Apoyo clásico para fuerza, potencia y constancia en entrenamientos exigentes.",
      href: "/productos",
      tone: "tone-cyan",
    },
    {
      title: "Running / energía",
      kicker: "Resistencia",
      count: "Endurance",
      description: "Energía sostenida, hidratación y recuperación pensadas para sesiones largas.",
      href: "/productos",
      tone: "tone-blue",
    },
    {
      title: "Recuperación",
      kicker: "Balance",
      count: "Reset",
      description: "Productos para acompañar mejor el después del entrenamiento y la continuidad semanal.",
      href: "/productos",
      tone: "tone-silver",
    },
  ];

  return (
    <Layout siteContent={siteContent}>
      <Hero siteContent={siteContent} featuredProducts={featuredProducts} />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Explorar"
            title="Entrá por categoría y encontrá más rápido lo que encaja con tu objetivo"
            description="Una home más limpia, con mejor lectura, bloques respirados y accesos claros para navegar como un ecommerce premium."
          />
          <div className="category-grid">
            {categoryHighlights.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Destacados"
            title="Cards comerciales más limpias, visualmente fuertes y con mejor jerarquía"
            description="Productos protagonistas con imagen mejor presentada, precio claro, objetivo visible y CTAs listos para convertir."
          />
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={siteContent.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionTitle
            eyebrow="Guía EVONUT"
            title="Qué necesitás según tu objetivo, tu actividad y lo que querés priorizar"
            description={siteContent.promoText}
          />
          <GuideWizard
            products={allProducts}
            whatsappNumber={siteContent.whatsappNumber}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Campañas visuales"
            title="Piezas listas para educar, vender mejor y darle más identidad real a EVONUT"
            description="Estas imágenes funcionan mejor como campañas editoriales dentro del sitio: mejoran percepción de marca y ayudan a explicar productos con más contexto."
          />
          <div className="campaign-grid">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Aprendé sin vueltas"
            title="Contenido orientativo pensado para vender con claridad, no para confundir"
            description="Bloques informativos más modernos, fáciles de leer y con una estética consistente con el resto del sitio."
          />
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Marcas"
            title="Las marcas y la identidad visual ya entran al home como piezas completas"
            description="En vez de separar todo en muchas tarjetas, esta sección resume mejor la propuesta y usa los artes que compartiste."
          />
          <div className="brand-visual-grid">
            <article className="brand-visual-card">
              <span>Nacionales</span>
              <img
                src="/images/campaigns/brands-nationales.png"
                alt="Marcas nacionales EVONUT"
              />
            </article>
            <article className="brand-visual-card">
              <span>Importadas</span>
              <img
                src="/images/campaigns/importadas.png"
                alt="Marcas importadas EVONUT"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="section section-contact">
        <div className="container contact-strip contact-strip--cta">
          <div>
            <p className="eyebrow">Contacto</p>
            <h2>¿Querés una selección armada para tu objetivo?</h2>
            <p>
              Escribinos por WhatsApp y te ayudamos a ordenar productos,
              prioridades y combinación orientativa sin vueltas.
            </p>
          </div>
          <a
            className="btn btn-primary"
            href={`https://wa.me/${siteContent.whatsappNumber}?text=Hola,%20quiero%20recibir%20asesoramiento%20sobre%20suplementos.`}
            target="_blank"
            rel="noreferrer"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}

function getServerSideProps() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 4);

  return {
    props: {
      siteContent,
      featuredProducts,
      allProducts: products,
      brands,
      articles: featuredArticles,
      campaigns,
    },
  };
}

export { getServerSideProps };
export default HomePage;
