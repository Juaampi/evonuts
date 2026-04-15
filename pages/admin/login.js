const { useState } = require("react");

function AdminLoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "No se pudo iniciar sesión");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Panel admin</p>
        <h1>Ingresar a EVONUT</h1>
        <p className="login-help">
          Usuario de prueba: <strong>admin@evonut.local</strong>
          <br />
          Clave de prueba: <strong>evonut123</strong>
        </p>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Contraseña
          <input name="password" type="password" required />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button className="btn btn-primary" type="submit">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}

export default AdminLoginPage;
