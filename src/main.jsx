import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartProvider } from './context/cartContext.jsx';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)
