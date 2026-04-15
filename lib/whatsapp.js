function createWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function createProductMessage(productName) {
  return `Hola, quiero consultar por ${productName}.`;
}

function createSelectionMessage(items) {
  const lines = items.map((item) => `- ${item.name}`);
  return `Hola, me interesan estos productos:\n${lines.join("\n")}`;
}

function createGuideMessage({ objective, activity, priority, items }) {
  const lines = items.map((item) => `- ${item.name}`);
  return `Hola, quiero asesoramiento.\nMi objetivo es ${objective}.\nHago ${activity}.\nQuiero priorizar ${priority}.\nMe interesan estos productos:\n${lines.join("\n")}`;
}

module.exports = {
  createGuideMessage,
  createProductMessage,
  createSelectionMessage,
  createWhatsAppUrl,
};
