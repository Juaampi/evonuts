const { createContext, useContext, useEffect, useMemo, useState } = require("react");

const SelectionContext = createContext(null);

function SelectionProvider({ children }) {
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("evonut-selection");
    if (stored) {
      setSelection(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("evonut-selection", JSON.stringify(selection));
  }, [selection]);

  const value = useMemo(
    () => ({
      selection,
      addItem(item) {
        setSelection((current) =>
          current.some((entry) => entry.id === item.id)
            ? current
            : [...current, item]
        );
      },
      removeItem(id) {
        setSelection((current) => current.filter((item) => item.id !== id));
      },
      clear() {
        setSelection([]);
      },
      hasItem(id) {
        return selection.some((item) => item.id === id);
      },
    }),
    [selection]
  );

  return (
    <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
  );
}

function useSelection() {
  return useContext(SelectionContext);
}

module.exports = { SelectionProvider, useSelection };
