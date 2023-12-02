import { Outlet } from "react-router-dom";
import { MenuContextProvider } from "./context/MenuListContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <MenuContextProvider>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </MenuContextProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
