function serialize(data) {
  return JSON.parse(JSON.stringify(data));
}

module.exports = { serialize };
