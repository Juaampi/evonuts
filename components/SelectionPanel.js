const { useSelection } = require("../lib/selection-context");
const { createSelectionMessage, createWhatsAppUrl } = require("../lib/whatsapp");

function SelectionPanel({ siteContent }) {
  const { selection, removeItem, clear } = useSelection();

  if (!selection.length) {
    return null;
  }

  const href = createWhatsAppUrl(
    siteContent?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    createSelectionMessage(selection)
  );

  return (
    <div className="selection-panel">
      <div className="selection-panel__head">
        <strong>Tu selección</strong>
        <small>
          {selection.length} producto{selection.length > 1 ? "s" : ""} listo
          {selection.length > 1 ? "s" : ""} para consultar
        </small>
      </div>
      <div className="selection-items">
        {selection.map((item) => (
          <button key={item.id} type="button" onClick={() => removeItem(item.id)}>
            {item.name} ×
          </button>
        ))}
      </div>
      <div className="selection-actions">
        <button type="button" className="btn btn-outline" onClick={clear}>
          Limpiar
        </button>
        <a className="btn btn-primary" href={href} target="_blank" rel="noreferrer">
          Enviar selección por WhatsApp
        </a>
      </div>
    </div>
  );
}

module.exports = SelectionPanel;
