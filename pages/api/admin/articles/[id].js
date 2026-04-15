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
    const article = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        body: body.body,
        category: body.category,
        coverImage: body.coverImage || "/images/products/whey-ena.svg",
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return res.status(200).json({ article });
  }

  if (req.method === "DELETE") {
    await prisma.article.delete({ where: { id } });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
