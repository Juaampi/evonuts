const AdminLayout = require("../../components/admin/AdminLayout");
const { prisma } = require("../../lib/prisma");
const { requireAdminPage } = require("../../lib/auth");
const { serialize } = require("../../lib/serialize");

function AdminDashboard({ stats }) {
  return (
    <AdminLayout title="Resumen general">
      <section className="admin-stats">
        <div className="stat-card">
          <span>Productos</span>
          <strong>{stats.products}</strong>
        </div>
        <div className="stat-card">
          <span>Marcas</span>
          <strong>{stats.brands}</strong>
        </div>
        <div className="stat-card">
          <span>Artículos</span>
          <strong>{stats.articles}</strong>
        </div>
      </section>
      <section className="admin-panel">
        <p>
          Desde este panel podés cargar, editar o eliminar productos, marcas,
          textos de home y artículos orientativos.
        </p>
      </section>
    </AdminLayout>
  );
}

async function getServerSideProps(context) {
  const auth = await requireAdminPage(context);
  if (auth.redirect) {
    return auth;
  }

  const [products, brands, articles] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.article.count(),
  ]);

  return {
    props: {
      ...serialize(auth.props),
      stats: { products, brands, articles },
    },
  };
}

export { getServerSideProps };
export default AdminDashboard;
