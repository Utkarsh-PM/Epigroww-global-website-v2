"use client";
import { createContext, useContext, useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

const MenuContext = createContext({ open: false, setOpen: () => {} });

export const useMenu = () => useContext(MenuContext);

export default function MenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      {children}
      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </MenuContext.Provider>
  );
}
