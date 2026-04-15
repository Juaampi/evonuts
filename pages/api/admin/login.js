const bcrypt = require("bcryptjs");
const { prisma } = require("../../../lib/prisma");
const { setAuthCookie, signAdminToken } = require("../../../lib/auth");

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password } = req.body;
  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = signAdminToken({ id: user.id, email: user.email, name: user.name });
  setAuthCookie(res, token);

  return res.status(200).json({ ok: true });
}

export default handler;
