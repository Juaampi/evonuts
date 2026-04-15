const { useMemo, useState } = require("react");
const { useSelection } = require("../lib/selection-context");
const { GUIDE_OPTIONS, GUIDE_RECOMMENDATIONS } = require("../lib/content");
const { createGuideMessage, createWhatsAppUrl } = require("../lib/whatsapp");

function GuideWizard({ products, whatsappNumber }) {
  const { addItem, selection } = useSelection();
  const [objective, setObjective] = useState(GUIDE_OPTIONS.objectives[0]);
  const [activity, setActivity] = useState(GUIDE_OPTIONS.activities[0]);
  const [priority, setPriority] = useState(GUIDE_OPTIONS.priorities[0]);
  const progress = [objective, activity, priority].filter(Boolean).length;

  const recommendation = useMemo(() => {
    return (
      GUIDE_RECOMMENDATIONS.find(
        (item) =>
          item.objective === objective &&
          item.activity === activity &&
          item.priority === priority
      ) ||
      GUIDE_RECOMMENDATIONS.find((item) => item.objective === objective) ||
      GUIDE_RECOMMENDATIONS[0]
    );
  }, [activity, objective, priority]);

  const suggestedProducts = useMemo(() => {
    return products.filter((product) =>
      recommendation.categories.includes(product.category)
    );
  }, [products, recommendation.categories]);

  const guideUrl = createWhatsAppUrl(
    whatsappNumber,
    createGuideMessage({
      objective,
      activity,
      priority,
      items: selection,
    })
  );

  return (
    <section className="guide-card">
      <div className="guide-progress">
        <div className="guide-progress__bar">
          <span style={{ width: `${(progress / 3) * 100}%` }} />
        </div>
        <small>Proceso guiado de 3 pasos</small>
      </div>
      <div className="guide-grid">
        <div className="guide-steps">
          <div className="guide-step">
            <p className="guide-step-title">Paso 1. ¿Cuál es tu objetivo?</p>
            <div className="choice-grid">
              {GUIDE_OPTIONS.objectives.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setObjective(option)}
                  className={objective === option ? "choice active" : "choice"}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="guide-step">
            <p className="guide-step-title">Paso 2. ¿Qué actividad hacés?</p>
            <div className="choice-grid">
              {GUIDE_OPTIONS.activities.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActivity(option)}
                  className={activity === option ? "choice active" : "choice"}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="guide-step">
            <p className="guide-step-title">Paso 3. ¿Qué querés priorizar?</p>
            <div className="choice-grid">
              {GUIDE_OPTIONS.priorities.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPriority(option)}
                  className={priority === option ? "choice active" : "choice"}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="guide-result">
          <p className="eyebrow">Paso 4. Recomendación orientativa</p>
          <h3>Una recomendación clara para arrancar mejor</h3>
          <p>{recommendation.recommendation}</p>
          <p className="guide-warning">
            Esta guía es orientativa y no reemplaza el asesoramiento profesional
            personalizado.
          </p>

          <div className="suggested-list">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="suggested-item">
                <div>
                  <span>{product.brand.name}</span>
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </div>
                <button type="button" onClick={() => addItem(product)}>
                  Sumar
                </button>
              </div>
            ))}
          </div>

          <a
            className={`btn btn-primary ${selection.length ? "" : "disabled"}`}
            href={selection.length ? guideUrl : "#"}
            target="_blank"
            rel="noreferrer"
          >
            Enviar mi selección por WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
}

module.exports = GuideWizard;
