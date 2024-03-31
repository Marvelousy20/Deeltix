"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IProduct {
  url: string[];
  setUrl: Dispatch<SetStateAction<string[]>>;
  banner: string[];
  setBanner: Dispatch<SetStateAction<string[]>>;
}

const productContext = createContext<IProduct | undefined>(undefined);
const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [url, setUrl] = useState<string[]>([]);
  const [banner, setBanner] = useState<string[]>([]);
  return (
    <productContext.Provider value={{ url, setUrl, banner, setBanner }}>
      {children}
    </productContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(productContext);
  if (!context) {
    throw new Error("useProduct must be used within product provider");
  }
  return context;
};

export { ProductProvider, useProduct };
