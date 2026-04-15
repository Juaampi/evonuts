const { useState } = require("react");
const AdminLayout = require("../../components/admin/AdminLayout");
const { prisma } = require("../../lib/prisma");
const { requireAdminPage } = require("../../lib/auth");
const { serialize } = require("../../lib/serialize");

function AdminConfigPage({ siteContent }) {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("Configuración actualizada");
    }
  }

  return (
    <AdminLayout title="Home y contacto">
      <form className="admin-form admin-form-wide" onSubmit={handleSubmit}>
        <label>
          Hero título
          <input name="heroTitle" defaultValue={siteContent.heroTitle} />
        </label>
        <label>
          Hero subtítulo
          <input name="heroSubtitle" defaultValue={siteContent.heroSubtitle} />
        </label>
        <label>
          Hero descripción
          <textarea name="heroDescription" rows="4" defaultValue={siteContent.heroDescription} />
        </label>
        <label>
          CTA principal
          <input name="heroPrimaryCta" defaultValue={siteContent.heroPrimaryCta} />
        </label>
        <label>
          CTA secundario
          <input name="heroSecondaryCta" defaultValue={siteContent.heroSecondaryCta} />
        </label>
        <label>
          Texto promo
          <textarea name="promoText" rows="4" defaultValue={siteContent.promoText} />
        </label>
        <label>
          Teléfono
          <input name="contactPhone" defaultValue={siteContent.contactPhone} />
        </label>
        <label>
          WhatsApp
          <input name="whatsappNumber" defaultValue={siteContent.whatsappNumber} />
        </label>
        <label>
          Dirección
          <input name="address" defaultValue={siteContent.address} />
        </label>
        <label>
          Horarios
          <input name="schedule" defaultValue={siteContent.schedule} />
        </label>
        <label>
          URL mapa embebido
          <input name="mapEmbedUrl" defaultValue={siteContent.mapEmbedUrl || ""} />
        </label>
        {status ? <p className="form-success">{status}</p> : null}
        <button className="btn btn-primary" type="submit">
          Guardar cambios
        </button>
      </form>
    </AdminLayout>
  );
}

async function getServerSideProps(context) {
  const auth = await requireAdminPage(context);
  if (auth.redirect) {
    return auth;
  }

  const siteContent = await prisma.siteContent.findFirst();
  return { props: { ...serialize(auth.props), siteContent: serialize(siteContent) } };
}

export { getServerSideProps };
export default AdminConfigPage;
