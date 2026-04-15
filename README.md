# EVONUT Suplementos Deportivos

## Arquitectura propuesta

- Frontend: `Next.js` con Pages Router para compatibilidad con `Node 16`.
- Backend: API Routes dentro del mismo proyecto para login admin, CRUD y subida de imágenes.
- Base de datos: `SQLite` para versión inicial local.
- ORM: `Prisma Client` para lectura y escritura desde frontend SSR y panel admin.
- Autenticación admin: login simple con usuario persistido en base y sesión por cookie `httpOnly`.
- Estado de selección: contexto cliente con `localStorage` para armar listas y enviarlas por WhatsApp.
- Integración comercial: WhatsApp como cierre principal en producto individual, selección múltiple y guía orientativa.

## Mapa del sitio

- `/`
  Home con hero, destacados, guía rápida, info, marcas y contacto.
- `/productos`
  Catálogo con filtros por marca, categoría, objetivo, tipo y buscador.
- `/guia`
  Asistente visual por pasos para orientar una selección.
- `/info`
  Bloques educativos / blog.
- `/info/[slug]`
  Detalle de artículo.
- `/marcas`
  Marcas nacionales e importadas.
- `/contacto`
  Formulario visual, WhatsApp, datos y mapa.
- `/admin/login`
  Acceso al panel.
- `/admin`
  Resumen del panel.
- `/admin/productos`
  Alta, edición y eliminación de productos.
- `/admin/marcas`
  Alta, edición y eliminación de marcas.
- `/admin/articulos`
  Alta, edición y eliminación de artículos.
- `/admin/configuracion`
  Edición de textos principales y datos de contacto.

## Modelos de datos

### `AdminUser`
- `email`
- `passwordHash`
- `name`

### `Brand`
- `name`
- `slug`
- `origin`
- `description`
- `logo`
- `featured`
- `sortOrder`

### `Product`
- `name`
- `slug`
- `image`
- `brandId`
- `type`
- `category`
- `price`
- `shortDescription`
- `longDescription`
- `primaryGoal`
- `featured`
- `stock`
- `sortOrder`

### `Article`
- `title`
- `slug`
- `excerpt`
- `body`
- `category`
- `coverImage`
- `featured`
- `sortOrder`

### `SiteContent`
- `heroTitle`
- `heroSubtitle`
- `heroDescription`
- `heroPrimaryCta`
- `heroSecondaryCta`
- `promoTitle`
- `promoText`
- `contactPhone`
- `whatsappNumber`
- `address`
- `schedule`
- `mapEmbedUrl`

## Cómo correrlo localmente

1. Entrá a la carpeta:

```bash
cd c:\xampp\htdocs\evonut
```

2. Instalá dependencias:

```bash
npm install
```

3. Inicializá base y mock data:

```bash
npm run setup
```

4. Levantá el proyecto:

```bash
npm run dev
```

5. Abrilo en:

```text
http://localhost:3000
```

## Credenciales admin de prueba

- Usuario: `admin@evonut.local`
- Contraseña: `evonut123`

## Nota sobre `localhost/evonut`

Como este proyecto tiene backend real con `Next.js`, localmente corre sobre servidor Node y no directamente como sitio estático de Apache en `http://localhost/evonut`.

Si querés, en el siguiente paso te puedo dejar preparada una configuración de proxy para Apache/XAMPP y así abrirlo exactamente desde `http://localhost/evonut`.
