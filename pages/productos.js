const { useMemo, useState } = require("react");
const Layout = require("../components/Layout");
const SectionTitle = require("../components/SectionTitle");
const ProductCard = require("../components/ProductCard");
const { products, brands, siteContent } = require("../lib/data");

function ProductsPage({ siteContent, products, brands }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [goal, setGoal] = useState("Todos");
  const [type, setType] = useState("Todos");

  const categories = ["Todas", ...new Set(products.map((product) => product.category))];
  const goals = ["Todos", ...new Set(products.map((product) => product.primaryGoal))];
  const types = ["Todos", "nacional", "importado"];

  const filtered = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (brand === "Todas" || product.brand.name === brand) &&
        (category === "Todas" || product.category === category) &&
        (goal === "Todos" || product.primaryGoal === goal) &&
        (type === "Todos" || product.type === type)
      );
    });
  }, [brand, category, goal, products, search, type]);

  const national = filtered.filter((product) => product.type === "nacional");
  const imported = filtered.filter((product) => product.type === "importado");

  return (
    <Layout
      siteContent={siteContent}
      title="Productos"
      description="Proteínas, creatinas, energía, ganadores de peso y más."
    >
      <section className="page-hero compact">
        <div className="container">
          <SectionTitle
            eyebrow="Catálogo"
            title="Un catálogo más limpio, más premium y mucho más claro de navegar"
            description="Buscá por marca, categoría, objetivo o tipo y armá tu selección con una experiencia más ordenada, elegante y comercial."
          />
          <div className="catalog-summary">
            <div className="catalog-stat">
              <strong>{filtered.length}</strong>
              <span>productos filtrados</span>
            </div>
            <div className="catalog-stat">
              <strong>{national.length}</strong>
              <span>nacionales</span>
            </div>
            <div className="catalog-stat">
              <strong>{imported.length}</strong>
              <span>importados</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container filters-shell">
          <div className="filters-panel">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto"
            />
            <select value={brand} onChange={(event) => setBrand(event.target.value)}>
              <option>Todas</option>
              {brands.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select value={goal} onChange={(event) => setGoal(event.target.value)}>
              {goals.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              {types.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="filter-chips">
            {[brand, category, goal, type]
              .filter((item) => item !== "Todas" && item !== "Todos")
              .map((item) => (
                <span key={item}>{item}</span>
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="split-title">Suplementos nacionales</h2>
          <div className="product-grid">
            {national.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={siteContent.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="split-title">Suplementos importados</h2>
          <div className="product-grid">
            {imported.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={siteContent.whatsappNumber}
              />
            ))}
          </div>
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
      brands,
    },
  };
}

export { getServerSideProps };
export default ProductsPage;
