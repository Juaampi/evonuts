const { useState } = require("react");
const AdminLayout = require("../../components/admin/AdminLayout");
const { prisma } = require("../../lib/prisma");
const { requireAdminPage } = require("../../lib/auth");
const { serialize } = require("../../lib/serialize");

const initialForm = {
  id: null,
  title: "",
  category: "",
  excerpt: "",
  body: "",
  coverImage: "",
  sortOrder: 0,
  featured: false,
};

function ArticlesAdminPage({ articles }) {
  const [items, setItems] = useState(articles);
  const [form, setForm] = useState(initialForm);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(article) {
    setForm({
      id: article.id,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      body: article.body,
      coverImage: article.coverImage || "",
      sortOrder: article.sortOrder ?? 0,
      featured: article.featured,
    });
  }

  function resetForm() {
    setForm(initialForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const editing = Boolean(form.id);
    const endpoint = editing ? `/api/admin/articles/${form.id}` : "/api/admin/articles";

    const response = await fetch(endpoint, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder || 0) }),
    });

    const data = await response.json();
    if (response.ok) {
      setItems((current) =>
        editing
          ? current.map((item) => (item.id === data.article.id ? data.article : item))
          : [...current, data.article]
      );
      resetForm();
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
      if (form.id === id) {
        resetForm();
      }
    }
  }

  return (
    <AdminLayout title="Artículos y guías">
      <section className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{form.id ? "Editar artículo" : "Nuevo artículo"}</h2>
          <label>
            Título
            <input value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
          </label>
          <label>
            Categoría
            <input value={form.category} onChange={(e) => updateField("category", e.target.value)} required />
          </label>
          <label>
            Resumen
            <textarea value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} rows="3" required />
          </label>
          <label>
            Contenido
            <textarea value={form.body} onChange={(e) => updateField("body", e.target.value)} rows="7" required />
          </label>
          <label>
            Imagen de portada
            <input value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="/images/products/whey-ena.svg" />
          </label>
          <label>
            Orden
            <input type="number" min="0" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} />
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Destacado
          </label>
          <div className="product-actions">
            <button className="btn btn-primary" type="submit">
              {form.id ? "Guardar cambios" : "Guardar artículo"}
            </button>
            {form.id ? (
              <button className="btn btn-outline" type="button" onClick={resetForm}>
                Cancelar edición
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-panel">
          <h2>Contenido cargado</h2>
          <div className="admin-table">
            {items.map((article) => (
              <div className="admin-row" key={article.id}>
                <div>
                  <strong>{article.title}</strong>
                  <small>{article.category}</small>
                </div>
                <div className="product-actions">
                  <button type="button" className="btn btn-outline" onClick={() => startEdit(article)}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => handleDelete(article.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

async function getServerSideProps(context) {
  const auth = await requireAdminPage(context);
  if (auth.redirect) {
    return auth;
  }

  const articles = await prisma.article.findMany({ orderBy: { sortOrder: "asc" } });
  return { props: { ...serialize(auth.props), articles: serialize(articles) } };
}

export { getServerSideProps };
export default ArticlesAdminPage;
