require("../styles/globals.css");
const { SelectionProvider } = require("../lib/selection-context");

function App({ Component, pageProps }) {
  return (
    <SelectionProvider>
      <Component {...pageProps} />
    </SelectionProvider>
  );
}

export default App;
