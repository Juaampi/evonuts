const Link = require("next/link").default;

function AdminLayout({ children, title }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-brand">EVONUT Admin</p>
        <nav>
          <Link href="/admin">Resumen</Link>
          <Link href="/admin/productos">Productos</Link>
          <Link href="/admin/marcas">Marcas</Link>
          <Link href="/admin/articulos">Artículos</Link>
          <Link href="/admin/configuracion">Home y contacto</Link>
        </nav>
        <form method="post" action="/api/admin/logout">
          <button type="submit" className="btn btn-outline admin-logout">
            Cerrar sesión
          </button>
        </form>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>{title}</h1>
        </header>
        {children}
      </div>
    </div>
  );
}

module.exports = AdminLayout;
