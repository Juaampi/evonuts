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
    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: slugify(body.title),
        excerpt: body.excerpt,
        body: body.body,
        category: body.category,
        coverImage: body.coverImage || "/images/products/whey-ena.svg",
        featured: Boolean(body.featured),
        sortOrder: Number(body.sortOrder || 0),
      },
    });

    return res.status(201).json({ article });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
