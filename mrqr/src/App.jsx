import { Outlet, Routes, Route, BrowserRouter } from 'react-router-dom'
import { MenuContextProvider } from './context/MenuListContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import { SyncLoader } from 'react-spinners'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './pages/ErrorFallback'

const Home = React.lazy(() => import('./pages/Home'))
const StorePage = React.lazy(() => import('./pages/StorePage'))
const MenuOptionPage = React.lazy(() => import('./pages/MenuOptionPage'))
const CartOrderPage = React.lazy(() => import('./pages/CartOrderPage'))
const OrderPage = React.lazy(() => import('./pages/OrderPage'))

function App () {
  const queryClient = new QueryClient()
  return (
    <Suspense fallback={<SyncLoader color='#36d7b7' />}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            queryClient.resetQueries()
          }}
        >
          <CookiesProvider>
            <MenuContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/:storeId' element={<StorePage />} />
                  <Route
                    path='/:storeId/:stock_id'
                    element={<MenuOptionPage />}
                  />
                  <Route
                    path='/:storeId/:tableNumber/cart'
                    element={<CartOrderPage />}
                  />
                  <Route
                    path='/:storeId/:tableNumber/order'
                    element={<OrderPage />}
                  />
                  <Route path='*' element={<Outlet />} />
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </MenuContextProvider>
          </CookiesProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
