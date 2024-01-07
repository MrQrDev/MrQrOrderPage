import { Outlet, Routes, Route, BrowserRouter } from 'react-router-dom'
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
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          queryClient.resetQueries()
        }}
      >
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:storeId'>
                  <Route index element={<StorePage />} />
                  <Route path=':stock_id' element={<MenuOptionPage />} />
                  <Route path=':tableNumber/cart' element={<CartOrderPage />} />
                  <Route path=':tableNumber/order' element={<OrderPage />} />
                </Route>
                <Route path='*' element={<Outlet />} />
              </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </CookiesProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
