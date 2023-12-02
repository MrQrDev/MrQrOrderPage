import { createContext, useState } from "react";

// 컨텍스트의 타입 정의
const initialMenuContextValue = {
  menuData: null,
  setMenuData: () => {},
};

export const MenuContext = createContext(initialMenuContextValue);

export function MenuContextProvider({ children }) {
  const [menuData, setMenuData] = useState("abc");
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <MenuContext.Provider
      value={{ menuData, setMenuData, categories, setCategories }}
    >
      {children}
    </MenuContext.Provider>
  );
}
