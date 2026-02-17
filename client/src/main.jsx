import { ToastContainer } from "react-toastify";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={3}
      theme="colored"
      toastStyle={{
        borderRadius: "12px",
        padding: "12px 14px",
        fontSize: "14px"
      }}
    />

  </>
)
