import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserProvider from './context/user'
import CartProvider from './context/cart'

export const metadata = {
  title: 'eBay Clone',
  description: 'eBay clone is the best online auction script for entrepreneurs to build their multi-vendor marketplace website and app enriched with cutting-edge features.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <ToastContainer />

          <UserProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </UserProvider>

        </div>
      </body>
    </html>
  )
}


//In the context of React, specifically when using the react-toastify library, the ToastContainer is a component that is responsible for rendering all toast notifications in a React app.
