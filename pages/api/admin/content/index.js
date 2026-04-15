const { prisma } = require("../../../../lib/prisma");
const { requireAdminApi } = require("../../../../lib/auth");

async function handler(req, res) {
  const user = requireAdminApi(req, res);
  if (!user) {
    return;
  }

  if (req.method === "PUT") {
    const body = req.body;
    const current = await prisma.siteContent.findFirst();
    const siteContent = await prisma.siteContent.update({
      where: { id: current.id },
      data: body,
    });

    return res.status(200).json({ siteContent });
  }

  return res.status(405).json({ error: "Método no permitido" });
}

export default handler;
