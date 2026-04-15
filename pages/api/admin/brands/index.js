const { prisma } = require("../../../../lib/prisma");
const { requireAdminApi } = require("../../../../lib/auth");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function handler(req, res) {
  const user = requireAdminApi(req, res);
  if (!user) {
    return;
  }

  if (req.method === "POST") {
    const body = req.body;
    const brand = await prisma.brand.create({
      data: {
        name: body.name,
        slug: slugify(body.name),
        origin: body.origin,
        description: body.description,
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return res.status(201).json({ brand });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
