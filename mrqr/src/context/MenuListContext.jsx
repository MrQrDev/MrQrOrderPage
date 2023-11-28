import React, { createContext, useEffect, useState } from "react";

// 컨텍스트의 타입 정의
const initialMenuContextValue = {
  menuData: null,
  setMenuData: () => {},
};

export const MenuContext = createContext(initialMenuContextValue);

export function MenuContextProvider({ children }) {
  const [menuData, setMenuData] = useState(null);
  const [cart, setCart] = useState(["a", "b", "c"]);
  return (
    <MenuContext.Provider value={{ menuData, setMenuData }}>
      {children}
    </MenuContext.Provider>
  );
}
