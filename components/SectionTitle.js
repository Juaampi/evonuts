function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-title ${centered ? "centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

module.exports = SectionTitle;
