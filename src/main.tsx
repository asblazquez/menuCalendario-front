import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'
import { CookiesProvider } from 'react-cookie'
import { Bounce, ToastContainer } from 'react-toastify'
import { TOAST_OPTIONS } from './Utils/Constants.ts'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <CookiesProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
    <App />
  </CookiesProvider>
  //</StrictMode>
)
