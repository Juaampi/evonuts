const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const schemaSql = `
CREATE TABLE IF NOT EXISTS AdminUser (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  name TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Brand (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  origin TEXT NOT NULL,
  description TEXT NOT NULL,
  logo TEXT,
  featured BOOLEAN NOT NULL DEFAULT 0,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT NOT NULL,
  brandId INTEGER NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  shortDescription TEXT NOT NULL,
  longDescription TEXT NOT NULL,
  primaryGoal TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT 0,
  stock INTEGER,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brandId) REFERENCES Brand(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Article (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  coverImage TEXT,
  featured BOOLEAN NOT NULL DEFAULT 0,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS SiteContent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  heroTitle TEXT NOT NULL,
  heroSubtitle TEXT NOT NULL,
  heroDescription TEXT NOT NULL,
  heroPrimaryCta TEXT NOT NULL,
  heroSecondaryCta TEXT NOT NULL,
  promoTitle TEXT NOT NULL,
  promoText TEXT NOT NULL,
  contactPhone TEXT NOT NULL,
  whatsappNumber TEXT NOT NULL,
  address TEXT NOT NULL,
  schedule TEXT NOT NULL,
  mapEmbedUrl TEXT,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.run(schemaSql);

  const target = path.join(process.cwd(), "dev.db");
  fs.writeFileSync(target, Buffer.from(db.export()));
  db.close();
  console.log(`Database initialized at ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
