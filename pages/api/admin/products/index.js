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
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: slugify(body.name),
        image: body.image || "/images/products/whey-ena.svg",
        brandId: Number(body.brandId),
        type: body.type,
        category: body.category,
        price: Number(body.price),
        shortDescription: body.shortDescription,
        longDescription: body.longDescription,
        primaryGoal: body.primaryGoal,
        featured: Boolean(body.featured),
        stock: body.stock === null ? null : Number(body.stock),
        sortOrder: Number(body.sortOrder || 0),
      },
      include: { brand: true },
    });

    return res.status(201).json({ product });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
