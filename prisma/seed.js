const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@admin.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "Administrador EVONUT" },
    create: {
      email: adminEmail,
      passwordHash,
      name: "Administrador EVONUT",
    },
  });

  const brands = [
    ["ENA", "nacional", "Marca argentina muy elegida por quienes buscan rendimiento confiable y buena relación precio-calidad.", true],
    ["Star Nutrition", "nacional", "Suplementación deportiva orientada a fuerza, recuperación y uso diario en entrenamiento.", true],
    ["Body Advance", "nacional", "Opciones pensadas para sumar calorías, proteínas y apoyo nutricional para objetivos de volumen.", false],
    ["Nutremax", "nacional", "Línea de suplementos versátil para sumar proteínas, energía y apoyo general.", false],
    ["Hoch Sport", "importado", "Perfil más técnico, ideal para quienes priorizan resistencia, calidad y recuperación.", false],
    ["Max Force", "importado", "Marca de enfoque intenso para rendimiento, fuerza y entrenamientos demandantes.", true],
    ["Gold Nutrition", "importado", "Suplementación premium orientada a atletas y personas activas.", false],
    ["Mervick", "nacional", "Opciones accesibles para complementar alimentación y rutina deportiva.", false],
    ["Xtrenght", "importado", "Marca orientada a pre entrenos, energía y objetivos de alta exigencia.", true],
    ["La Ganexa", "nacional", "Snacks y pastas de maní para sumar calorías de forma práctica y rica.", true],
  ];

  const brandRecords = {};

  for (const [name, origin, description, featured] of brands) {
    const brand = await prisma.brand.upsert({
      where: { slug: slugify(name) },
      update: { name, origin, description, featured },
      create: {
        name,
        slug: slugify(name),
        origin,
        description,
        featured,
      },
    });

    brandRecords[name] = brand;
  }

  const products = [
    {
      name: "Whey Protein ENA Pro",
      image: "/images/products/whey-ena.svg",
      brand: "ENA",
      type: "nacional",
      category: "Proteínas",
      price: 42900,
      shortDescription: "Proteína de rápida absorción para sumar proteína diaria y apoyar recuperación.",
      longDescription: "Ideal para quienes entrenan musculación o funcional y necesitan llegar mejor a su objetivo de proteína diaria. Sirve como apoyo práctico post entrenamiento o en colaciones.",
      primaryGoal: "Ganar masa muscular",
      featured: true,
      stock: 14,
      sortOrder: 1,
    },
    {
      name: "Creatina Star Nutrition Monohydrate",
      image: "/images/products/creatina-star.svg",
      brand: "Star Nutrition",
      type: "nacional",
      category: "Creatinas",
      price: 35800,
      shortDescription: "Creatina monohidratada para fuerza, potencia y mejor rendimiento sostenido.",
      longDescription: "Una base clásica para quienes hacen gimnasio, funcional o deportes de equipo. Ayuda a sostener fuerza y rendimiento con uso diario y constancia.",
      primaryGoal: "Fuerza",
      featured: true,
      stock: 18,
      sortOrder: 2,
    },
    {
      name: "Glutamina Recovery Star Nutrition",
      image: "/images/products/glutamina-star.svg",
      brand: "Star Nutrition",
      type: "nacional",
      category: "Recuperación",
      price: 26700,
      shortDescription: "Apoyo orientativo para etapas de recuperación y entrenamientos exigentes.",
      longDescription: "Puede ser una opción interesante para quienes entrenan seguido y buscan reforzar su rutina de recuperación junto con buena alimentación e hidratación.",
      primaryGoal: "Mejorar recuperación",
      featured: false,
      stock: 10,
      sortOrder: 3,
    },
    {
      name: "Mass Gainer Body Advance",
      image: "/images/products/gainer-body-advance.svg",
      brand: "Body Advance",
      type: "nacional",
      category: "Ganadores de peso",
      price: 49800,
      shortDescription: "Fórmula alta en calorías para quienes necesitan subir peso o sumar energía.",
      longDescription: "Pensado para personas con gasto energético alto, contexturas delgadas o etapas donde cuesta llegar a las calorías diarias solo con comida.",
      primaryGoal: "Ganar peso",
      featured: true,
      stock: 8,
      sortOrder: 4,
    },
    {
      name: "Pasta de Maní Crunch La Ganexa",
      image: "/images/products/pasta-maní-ganexa.svg",
      brand: "La Ganexa",
      type: "nacional",
      category: "Pastas de maní",
      price: 8900,
      shortDescription: "Opción práctica para sumar calorías y sabor en desayunos, snacks y licuados.",
      longDescription: "Ideal para complementar alimentación, sumar energía en colaciones y darle un plus calórico simple a una dieta enfocada en rendimiento o aumento de peso.",
      primaryGoal: "Complementar alimentación",
      featured: false,
      stock: 22,
      sortOrder: 5,
    },
    {
      name: "Protein Bar Mervick Fit",
      image: "/images/products/snack-mervick.svg",
      brand: "Mervick",
      type: "nacional",
      category: "Snacks saludables",
      price: 3200,
      shortDescription: "Snack práctico para llevar, cortar hambre y sumar proteína de forma simple.",
      longDescription: "Útil para días largos, post entrenamiento o cuando necesitás resolver una colación rápida sin caer en opciones improvisadas.",
      primaryGoal: "Proteína diaria",
      featured: false,
      stock: 35,
      sortOrder: 6,
    },
    {
      name: "Pre Workout Xtrenght Rush",
      image: "/images/products/pre-xtrenght.svg",
      brand: "Xtrenght",
      type: "importado",
      category: "Pre entrenos",
      price: 61200,
      shortDescription: "Pre entreno intenso para quienes buscan enfoque y energía antes de sesiones fuertes.",
      longDescription: "Suele elegirse en etapas de entrenamientos demandantes. Conviene usarlo con criterio y según tolerancia individual, especialmente si entrenás tarde.",
      primaryGoal: "Energía antes de entrenar",
      featured: true,
      stock: 9,
      sortOrder: 7,
    },
    {
      name: "Isolate Gold Nutrition Pure Whey",
      image: "/images/products/whey-gold.svg",
      brand: "Gold Nutrition",
      type: "importado",
      category: "Proteínas",
      price: 68900,
      shortDescription: "Proteína whey orientada a recuperación y masa muscular con perfil más premium.",
      longDescription: "Opción para quienes quieren una proteína práctica, de buena disolución y uso diario en etapas de entrenamiento frecuente.",
      primaryGoal: "Ganar masa muscular",
      featured: true,
      stock: 7,
      sortOrder: 8,
    },
    {
      name: "Electro Run Hoch Sport",
      image: "/images/products/running-hoch.svg",
      brand: "Hoch Sport",
      type: "importado",
      category: "Energía / resistencia",
      price: 21900,
      shortDescription: "Bebida en polvo con foco en hidratación y resistencia para running y cardio.",
      longDescription: "Pensada para quienes corren o hacen sesiones largas y quieren acompañar mejor la hidratación, sobre todo en climas calurosos o entrenamientos prolongados.",
      primaryGoal: "Mejorar rendimiento al correr",
      featured: false,
      stock: 16,
      sortOrder: 9,
    },
    {
      name: "Creatina Max Force Reload",
      image: "/images/products/creatina-max-force.svg",
      brand: "Max Force",
      type: "importado",
      category: "Creatinas",
      price: 47200,
      shortDescription: "Creatina enfocada en fuerza, repeticiones de calidad y constancia en el rendimiento.",
      longDescription: "Una opción sólida para deportes de fuerza y rutinas donde buscás sostener intensidad y progresión en el tiempo.",
      primaryGoal: "Fuerza",
      featured: false,
      stock: 11,
      sortOrder: 10,
    },
    {
      name: "Amino Fuel Nutremax",
      image: "/images/products/amino-nutremax.svg",
      brand: "Nutremax",
      type: "nacional",
      category: "Aminoácidos",
      price: 24400,
      shortDescription: "Aminoácidos de apoyo para entrenamientos exigentes y recuperación general.",
      longDescription: "Puede acompañar rutinas intensas cuando querés reforzar la recuperación y cuidar la constancia semanal junto con buen descanso y alimentación.",
      primaryGoal: "Recuperación",
      featured: false,
      stock: 12,
      sortOrder: 11,
    },
    {
      name: "Runner Recovery Gold Nutrition",
      image: "/images/products/recovery-gold.svg",
      brand: "Gold Nutrition",
      type: "importado",
      category: "Recuperación",
      price: 38200,
      shortDescription: "Recuperador pensado para quienes corren, pedalean o hacen sesiones prolongadas.",
      longDescription: "Enfoque práctico para deportistas de resistencia que necesitan recomponer después del esfuerzo y seguir sumando entrenamientos con buenas sensaciones.",
      primaryGoal: "Mejorar recuperación",
      featured: false,
      stock: 6,
      sortOrder: 12,
    },
  ];

  for (const product of products) {
    const { brand, ...productData } = product;
    await prisma.product.upsert({
      where: { slug: slugify(product.name) },
      update: {
        ...productData,
        brandId: brandRecords[brand].id,
      },
      create: {
        ...productData,
        slug: slugify(product.name),
        brandId: brandRecords[brand].id,
      },
    });
  }

  const articles = [
    {
      title: "Qué es la proteína whey y cuándo te puede servir",
      excerpt: "Una guía simple para entender por qué tanta gente la usa y en qué momentos suma valor.",
      body: `La proteína whey es una forma práctica de sumar proteína diaria cuando con las comidas no alcanza o se complica organizarse.\n\nSuele ser útil después de entrenar, en desayunos rápidos o como colación. No reemplaza la comida real, pero sí puede ayudarte a llegar mejor a tus objetivos si buscás ganar masa muscular, recuperarte mejor o cuidar tu ingesta de proteína.\n\nSi recién arrancás, lo importante no es complicarse: proteína suficiente, entrenamiento constante y descanso siguen siendo la base.`,
      category: "Proteínas",
      coverImage: "/images/products/whey-ena.svg",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Para qué sirve la creatina y por qué es tan elegida",
      excerpt: "La creatina sigue siendo uno de los suplementos más usados por gente que entrena fuerza, funcional o deportes.",
      body: `La creatina se usa para acompañar el rendimiento en esfuerzos intensos y repetidos. Por eso es muy común en musculación, funcional y deportes de equipo.\n\nNo es un empujón mágico de un día para el otro: suele funcionar mejor con uso diario y constancia. Muchas personas la eligen para apoyar fuerza, potencia y calidad de entrenamiento.\n\nComo siempre, la base sigue siendo entrenar bien, comer acorde a tu objetivo y sostener una rutina.`,
      category: "Creatinas",
      coverImage: "/images/products/creatina-star.svg",
      featured: true,
      sortOrder: 2,
    },
    {
      title: "Cuándo conviene un ganador de peso",
      excerpt: "No todo el mundo necesita un gainer: te contamos en qué casos puede tener sentido.",
      body: `Los ganadores de peso suelen ser útiles cuando el objetivo es subir masa corporal y cuesta llegar a las calorías necesarias con comida sola.\n\nPueden servir en personas con mucho gasto, poco apetito o días muy cargados donde comer todo lo necesario se vuelve difícil. También se usan como complemento, no como única base.\n\nAntes de elegir uno, conviene pensar cuánto comés hoy, cuántas calorías te faltan y si te resulta más práctico un gainer o reforzar comidas con snacks y licuados.`,
      category: "Ganadores de peso",
      coverImage: "/images/products/gainer-body-advance.svg",
      featured: false,
      sortOrder: 3,
    },
    {
      title: "Qué sirve para correr y recuperarse mejor",
      excerpt: "Running no es solo energía antes de salir: hidratación y recuperación también pesan mucho.",
      body: `Si corrés, no todo pasa por el pre entreno. Muchas veces lo que más ordena el rendimiento es una buena hidratación, carbohidratos suficientes y una recuperación mejor armada.\n\nSegún distancia, frecuencia e intensidad, puede tener sentido sumar bebidas con electrolitos, opciones de energía o un recuperador post.\n\nLa idea es que el suplemento acompañe tu rutina, no que tape una base floja.`,
      category: "Running",
      coverImage: "/images/products/running-hoch.svg",
      featured: true,
      sortOrder: 4,
    },
    {
      title: "Cómo combinar suplementos básicos sin exagerar",
      excerpt: "Una combinación simple y realista suele funcionar mejor que llenar la alacena de productos.",
      body: `Para mucha gente, una base ordenada ya alcanza: proteína si cuesta llegar a la cuota diaria, creatina para fuerza o rendimiento y algún apoyo puntual según el objetivo.\n\nSi buscás subir calorías, snacks o pastas de maní pueden resolver más que sumar suplementos sin estrategia. Si corrés, capaz conviene mirar hidratación y recuperación antes que productos intensos.\n\nLa clave es no comprar por impulso. Primero el objetivo, después la combinación.`,
      category: "Guías",
      coverImage: "/images/products/pasta-maní-ganexa.svg",
      featured: false,
      sortOrder: 5,
    },
    {
      title: "Diferencias entre suplementación para gym y para running",
      excerpt: "El objetivo manda: no siempre conviene lo mismo para fuerza que para resistencia.",
      body: `En gimnasio suele haber más foco en proteína diaria, creatina, fuerza y ganancia muscular. En running, muchas veces ganan protagonismo la energía para sostener el esfuerzo, la hidratación y la recuperación.\n\nEso no significa que estén separados por completo, pero sí que conviene ordenar prioridades. Quien hace musculación probablemente mire proteína y fuerza. Quien corre seguido, quizás necesite pensar mejor el combustible y la reposición.`,
      category: "Guías",
      coverImage: "/images/products/recovery-gold.svg",
      featured: false,
      sortOrder: 6,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: slugify(article.title) },
      update: article,
      create: {
        ...article,
        slug: slugify(article.title),
      },
    });
  }

  const existingContent = await prisma.siteContent.findFirst();

  if (!existingContent) {
    await prisma.siteContent.create({
      data: {
        heroTitle: "Rendimiento real para cada objetivo",
        heroSubtitle: "EVONUT Suplementos Deportivos",
        heroDescription:
          "Suplementos claros, selección guiada y asesoramiento comercial por WhatsApp para gym, running y vida activa.",
        heroPrimaryCta: "Ver productos",
        heroSecondaryCta: "Necesito una guía",
        promoTitle: "Elegí mejor. Consultá más simple.",
        promoText:
          "Te ayudamos a entender qué suplemento puede ir con tu objetivo sin vueltas raras ni lenguaje técnico innecesario.",
        contactPhone: "+54 9 2944 20-0000",
        whatsappNumber: "5492944200000",
        address: "San Carlos de Bariloche, Río Negro",
        schedule: "Lunes a viernes de 9 a 18 hs. Sábados de 10 a 14 hs.",
        mapEmbedUrl:
          "https://www.google.com/maps?q=Bariloche%20Rio%20Negro&output=embed",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
