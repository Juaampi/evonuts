const PRODUCT_MEDIA = {
  "whey-protein-ena-pro": {
    image:
      "https://www.enasport.com/cdn/shop/files/TM_WP_1lbVa.jpg?v=1769005779&width=1500",
    accent: "cyan",
  },
  "creatina-star-nutrition-monohydrate": {
    image:
      "https://suplementos.com/new/wp-content/uploads/2020/03/Creatinax300grSN-800x800.jpg",
    accent: "blue",
  },
  "glutamina-recovery-star-nutrition": {
    image:
      "https://suplementos.com/new/wp-content/uploads/2020/03/Glutaminax300grSN-800x800.jpg",
    accent: "blue",
  },
  "pre-workout-xtrenght-rush": {
    image:
      "https://www.goldnutrition.com.ar/images/2022/12/07/sabor_whey_ripped_protein_gold_nutrition_gourmet_vainilla_suplemento_nutricional_deportivo.png",
    accent: "amber",
  },
  "isolate-gold-nutrition-pure-whey": {
    image:
      "https://www.goldnutrition.com.ar/images/2022/12/07/sabor_whey_ripped_protein_gold_nutrition_gourmet_chocolate_suplemento_nutricional_deportivo.png",
    accent: "amber",
  },
  "runner-recovery-gold-nutrition": {
    image:
      "https://www.goldnutrition.com.ar/images/2022/12/07/proteina_whey_ripped_gold_nutrition_protein_quemadora_cafeina_adelgazar_quemador.png",
    accent: "amber",
  },
};

function withProductMedia(product) {
  const media = PRODUCT_MEDIA[product.slug] || {};
  return {
    ...product,
    image: media.image || product.image,
    accent: media.accent || "cyan",
  };
}

function enhanceProducts(products) {
  return products.map(withProductMedia);
}

module.exports = { enhanceProducts, withProductMedia };
