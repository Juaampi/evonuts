const { useState } = require("react");
const AdminLayout = require("../../components/admin/AdminLayout");
const { prisma } = require("../../lib/prisma");
const { requireAdminPage } = require("../../lib/auth");
const { serialize } = require("../../lib/serialize");

const initialForm = {
  id: null,
  name: "",
  brandId: "",
  type: "nacional",
  category: "",
  price: "",
  image: "",
  shortDescription: "",
  longDescription: "",
  primaryGoal: "",
  stock: "",
  sortOrder: 0,
  featured: false,
};

function ProductAdminPage({ products, brands }) {
  const [items, setItems] = useState(products);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    ...initialForm,
    brandId: String(brands[0]?.id || ""),
  });

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name,
      brandId: String(product.brandId),
      type: product.type,
      category: product.category,
      price: String(product.price),
      image: product.image,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      primaryGoal: product.primaryGoal,
      stock: product.stock ?? "",
      sortOrder: product.sortOrder ?? 0,
      featured: product.featured,
    });
    setStatus(`Editando ${product.name}`);
  }

  function resetForm() {
    setForm({
      ...initialForm,
      brandId: String(brands[0]?.id || ""),
    });
    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const imageFile = formData.get("imageFile");
    let image = form.image;

    if (imageFile && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      const uploadResponse = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const uploadJson = await uploadResponse.json();
      image = uploadJson.path;
    }

    const payload = {
      ...form,
      image,
      stock: form.stock === "" ? null : Number(form.stock),
      price: Number(form.price),
      sortOrder: Number(form.sortOrder || 0),
      featured: Boolean(form.featured),
    };

    const editing = Boolean(form.id);
    const endpoint = editing ? `/api/admin/products/${form.id}` : "/api/admin/products";
    const method = editing ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "No se pudo guardar");
      return;
    }

    if (editing) {
      setItems((current) =>
        current.map((item) => (item.id === data.product.id ? data.product : item))
      );
      setStatus("Producto actualizado correctamente");
    } else {
      setItems((current) => [...current, data.product]);
      setStatus("Producto creado correctamente");
    }

    resetForm();
    event.currentTarget.reset();
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
      if (form.id === id) {
        resetForm();
      }
    }
  }

  return (
    <AdminLayout title="Productos">
      <section className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{form.id ? "Editar producto" : "Nuevo producto"}</h2>
          <label>
            Nombre
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
          </label>
          <label>
            Marca
            <select value={form.brandId} onChange={(e) => updateField("brandId", e.target.value)} required>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tipo
            <select value={form.type} onChange={(e) => updateField("type", e.target.value)} required>
              <option value="nacional">Nacional</option>
              <option value="importado">Importado</option>
            </select>
          </label>
          <label>
            Categoría
            <input value={form.category} onChange={(e) => updateField("category", e.target.value)} required />
          </label>
          <label>
            Precio
            <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => updateField("price", e.target.value)} required />
          </label>
          <label>
            Imagen URL
            <input value={form.image} onChange={(e) => updateField("image", e.target.value)} placeholder="/images/products/mi-producto.svg" />
          </label>
          <label>
            O subir imagen
            <input name="imageFile" type="file" accept="image/*" />
          </label>
          <label>
            Descripción corta
            <textarea value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} rows="3" required />
          </label>
          <label>
            Descripción larga
            <textarea value={form.longDescription} onChange={(e) => updateField("longDescription", e.target.value)} rows="4" required />
          </label>
          <label>
            Objetivo principal
            <input value={form.primaryGoal} onChange={(e) => updateField("primaryGoal", e.target.value)} required />
          </label>
          <label>
            Stock
            <input type="number" min="0" value={form.stock} onChange={(e) => updateField("stock", e.target.value)} />
          </label>
          <label>
            Orden
            <input type="number" min="0" value={form.sortOrder} onChange={(e) => updateField("sortOrder", e.target.value)} />
          </label>
          <label className="checkbox">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Destacado
          </label>
          {status ? <p className="form-success">{status}</p> : null}
          <div className="product-actions">
            <button className="btn btn-primary" type="submit">
              {form.id ? "Guardar cambios" : "Guardar producto"}
            </button>
            {form.id ? (
              <button className="btn btn-outline" type="button" onClick={resetForm}>
                Cancelar edición
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-panel">
          <h2>Productos cargados</h2>
          <div className="admin-table">
            {items.map((product) => (
              <div key={product.id} className="admin-row">
                <div>
                  <strong>{product.name}</strong>
                  <small>
                    {product.brand.name} · {product.category}
                  </small>
                </div>
                <div className="product-actions">
                  <button type="button" className="btn btn-outline" onClick={() => startEdit(product)}>
                    Editar
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => handleDelete(product.id)}>
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

  const [products, brands] = await Promise.all([
    prisma.product.findMany({ include: { brand: true }, orderBy: { sortOrder: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return {
    props: {
      ...serialize(auth.props),
      products: serialize(products),
      brands: serialize(brands),
    },
  };
}

export { getServerSideProps };
export default ProductAdminPage;
