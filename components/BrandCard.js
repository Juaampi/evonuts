function BrandCard({ brand }) {
  return (
    <article className="brand-card">
      <div className="brand-mark-badge">{brand.name.slice(0, 2).toUpperCase()}</div>
      <div className="brand-pill">{brand.origin}</div>
      <h3 className="brand-name">{brand.name}</h3>
      <p>{brand.description}</p>
    </article>
  );
}

module.exports = BrandCard;
