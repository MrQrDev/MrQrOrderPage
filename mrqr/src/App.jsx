import { Outlet } from "react-router-dom";
import { MenuContextProvider } from "./context/MenuListContext";

function App() {
  return (
    <section>
      <MenuContextProvider>
        <Outlet />
      </MenuContextProvider>
    </section>
  );
}

export default App;
