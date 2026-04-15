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
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
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

    return res.status(200).json({ product });
  }

  if (req.method === "DELETE") {
    await prisma.product.delete({ where: { id } });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
