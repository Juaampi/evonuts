const Link = require("next/link").default;

function CategoryCard({ category }) {
  return (
    <Link href={category.href} className={`category-card ${category.tone}`}>
      <div className="category-card__top">
        <span>{category.kicker}</span>
        <strong>{category.count}</strong>
      </div>
      <h3>{category.title}</h3>
      <p>{category.description}</p>
    </Link>
  );
}

module.exports = CategoryCard;
