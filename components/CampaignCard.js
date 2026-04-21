const Link = require("next/link").default;

function CampaignCard({ campaign }) {
  return (
    <article className="campaign-card">
      <div className="campaign-media">
        <img src={campaign.image} alt={campaign.title} />
      </div>
      <div className="campaign-content">
        <span>{campaign.tag}</span>
        <h3>{campaign.title}</h3>
        <p>{campaign.description}</p>
        <Link href={campaign.href}>Ver contenido</Link>
      </div>
    </article>
  );
}

module.exports = CampaignCard;
