import { Children, createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
