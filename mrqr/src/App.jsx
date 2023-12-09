import { Outlet } from "react-router-dom";
import { MenuContextProvider } from "./context/MenuListContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { SyncLoader } from "react-spinners";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/ErrorFallback";
function App() {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<SyncLoader color="#36d7b7" />}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            queryClient.resetQueries();
          }}
        >
          <CookiesProvider>
            <MenuContextProvider>
              <Outlet />
              <ReactQueryDevtools initialIsOpen={false} />
            </MenuContextProvider>
          </CookiesProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
