const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { requireAdminApi } = require("../../../lib/auth");

const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  const user = requireAdminApi(req, res);
  if (!user) {
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(500).json({ error: "No se pudo subir la imagen" });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: "No se recibió archivo" });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalFilename || file.newFilename || ".png");
    const fileName = `${Date.now()}${ext}`;
    const target = path.join(uploadsDir, fileName);
    fs.copyFileSync(file.filepath, target);

    return res.status(200).json({ path: `/uploads/${fileName}` });
  });
}

export { config };
export default handler;
