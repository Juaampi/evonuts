const GUIDE_OPTIONS = {
  objectives: [
    "Ganar peso",
    "Ganar masa muscular",
    "Mejorar recuperación",
    "Tener más energía para entrenar",
    "Mejorar rendimiento al correr",
    "Bajar grasa / mantener masa muscular",
    "Complementar alimentación",
  ],
  activities: [
    "Gimnasio / musculación",
    "Running",
    "Entrenamiento funcional",
    "Deportes de equipo",
    "Vida activa / bienestar general",
  ],
  priorities: [
    "Fuerza",
    "Resistencia",
    "Recuperación",
    "Subir calorías",
    "Proteína diaria",
    "Energía antes de entrenar",
  ],
};

const GUIDE_RECOMMENDATIONS = [
  {
    objective: "Ganar masa muscular",
    activity: "Gimnasio / musculación",
    priority: "Proteína diaria",
    recommendation:
      "Para ganar masa muscular suele servir una base simple: whey protein para llegar mejor a tu proteína diaria, creatina para acompañar fuerza y una alimentación ordenada.",
    categories: ["Proteínas", "Creatinas", "Recuperación"],
  },
  {
    objective: "Ganar peso",
    activity: "Gimnasio / musculación",
    priority: "Subir calorías",
    recommendation:
      "Si el objetivo es subir peso, una combinación orientativa puede ser ganador de peso, proteína y opciones prácticas para sumar calorías como snacks o pasta de maní.",
    categories: ["Ganadores de peso", "Proteínas", "Snacks saludables", "Pastas de maní"],
  },
  {
    objective: "Mejorar recuperación",
    activity: "Gimnasio / musculación",
    priority: "Recuperación",
    recommendation:
      "Para recuperación suele tener sentido mirar proteína, creatina y algún apoyo específico según el caso, siempre acompañado por descanso e hidratación.",
    categories: ["Proteínas", "Creatinas", "Recuperación", "Aminoácidos"],
  },
  {
    objective: "Tener más energía para entrenar",
    activity: "Entrenamiento funcional",
    priority: "Energía antes de entrenar",
    recommendation:
      "Si buscás más energía antes de entrenar, podés evaluar un pre entreno y revisar también cómo llegás de comida, sueño e hidratación.",
    categories: ["Pre entrenos", "Energía / resistencia"],
  },
  {
    objective: "Mejorar rendimiento al correr",
    activity: "Running",
    priority: "Resistencia",
    recommendation:
      "Para running suele rendir mejor pensar en energía sostenida, hidratación y recuperación. No siempre más intensidad es mejor: muchas veces gana una estrategia más equilibrada.",
    categories: ["Energía / resistencia", "Recuperación"],
  },
  {
    objective: "Bajar grasa / mantener masa muscular",
    activity: "Gimnasio / musculación",
    priority: "Proteína diaria",
    recommendation:
      "En objetivos de definición suele servir sostener la proteína diaria y cuidar la recuperación para entrenar con constancia sin perder calidad.",
    categories: ["Proteínas", "Recuperación", "Snacks saludables"],
  },
  {
    objective: "Complementar alimentación",
    activity: "Vida activa / bienestar general",
    priority: "Proteína diaria",
    recommendation:
      "Si buscás complementar tu alimentación, conviene empezar por opciones simples y prácticas: proteína, snacks saludables o pastas de maní según tu rutina diaria.",
    categories: ["Proteínas", "Snacks saludables", "Pastas de maní"],
  },
];

module.exports = { GUIDE_OPTIONS, GUIDE_RECOMMENDATIONS };
