const { useState } = require("react");
const AdminLayout = require("../../components/admin/AdminLayout");
const { prisma } = require("../../lib/prisma");
const { requireAdminPage } = require("../../lib/auth");
const { serialize } = require("../../lib/serialize");

const initialForm = {
  id: null,
  name: "",
  origin: "nacional",
  description: "",
  sortOrder: 0,
  featured: false,
};

function BrandsAdminPage({ brands }) {
  const [items, setItems] = useState(brands);
  const [form, setForm] = useState(initialForm);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(brand) {
    setForm({
      id: brand.id,
      name: brand.name,
      origin: brand.origin,
      description: brand.description,
      sortOrder: brand.sortOrder ?? 0,
      featured: brand.featured,
    });
  }

  function resetForm() {
    setForm(initialForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const editing = Boolean(form.id);
    const endpoint = editing ? `/api/admin/brands/${form.id}` : "/api/admin/brands";

    const response = await fetch(endpoint, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder || 0) }),
    });

    const data = await response.json();
    if (response.ok) {
      setItems((current) =>
        editing
          ? current.map((item) => (item.id === data.brand.id ? data.brand : item))
          : [...current, data.brand]
      );
      resetForm();
    }
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
      if (form.id === id) {
        resetForm();
      }
    }
  }

  return (
    <AdminLayout title="Marcas">
      <section className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{form.id ? "Editar marca" : "Nueva marca"}</h2>
          <label>
            Nombre
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
          </label>
          <label>
            Origen
            <select value={form.origin} onChange={(e) => updateField("origin", e.target.value)}>
              <option value="nacional">Nacional</option>
              <option value="importado">Importado</option>
            </select>
          </label>
          <label>
            Descripción
            <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows="4" required />
          </label>
          <label>
            Orden
            <input type="number" min="0" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} />
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Destacada
          </label>
          <div className="product-actions">
            <button className="btn btn-primary" type="submit">
              {form.id ? "Guardar cambios" : "Guardar marca"}
            </button>
            {form.id ? (
              <button className="btn btn-outline" type="button" onClick={resetForm}>
                Cancelar edición
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-panel">
          <h2>Marcas cargadas</h2>
          <div className="admin-table">
            {items.map((brand) => (
              <div className="admin-row" key={brand.id}>
                <div>
                  <strong>{brand.name}</strong>
                  <small>{brand.origin}</small>
                </div>
                <div className="product-actions">
                  <button type="button" className="btn btn-outline" onClick={() => startEdit(brand)}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => handleDelete(brand.id)}>
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

  const brands = await prisma.brand.findMany({ orderBy: { sortOrder: "asc" } });
  return { props: { ...serialize(auth.props), brands: serialize(brands) } };
}

export { getServerSideProps };
export default BrandsAdminPage;
