const jwt = require("jsonwebtoken");
const { serialize, parse } = require("cookie");

const COOKIE_NAME = "evonut_admin";

function getJwtSecret() {
  return process.env.JWT_SECRET || "evonut-dev-secret";
}

function signAdminToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

function setAuthCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );
}

function clearAuthCookie(res) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    })
  );
}

function getUserFromRequest(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
}

function requireAdminApi(req, res) {
  const user = getUserFromRequest(req);

  if (!user) {
    res.status(401).json({ error: "No autorizado" });
    return null;
  }

  return user;
}

async function requireAdminPage(context) {
  const user = getUserFromRequest(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return { props: { adminUser: user } };
}

module.exports = {
  clearAuthCookie,
  getUserFromRequest,
  requireAdminApi,
  requireAdminPage,
  setAuthCookie,
  signAdminToken,
};
