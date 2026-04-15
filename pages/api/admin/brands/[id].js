const { prisma } = require("../../../../lib/prisma");
const { requireAdminApi } = require("../../../../lib/auth");

async function handler(req, res) {
  const user = requireAdminApi(req, res);
  if (!user) {
    return;
  }

  const id = Number(req.query.id);

  if (req.method === "PUT") {
    const body = req.body;
    const brand = await prisma.brand.update({
      where: { id },
      data: {
        name: body.name,
        origin: body.origin,
        description: body.description,
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return res.status(200).json({ brand });
  }

  if (req.method === "DELETE") {
    await prisma.brand.delete({ where: { id } });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
