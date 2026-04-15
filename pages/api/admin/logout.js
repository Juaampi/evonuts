const { clearAuthCookie } = require("../../../lib/auth");

function handler(req, res) {
  clearAuthCookie(res);
  res.writeHead(302, { Location: "/admin/login" });
  res.end();
}

export default handler;
