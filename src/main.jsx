import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MainContextProvider } from './Contexts/MainContext.jsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './Store/Store.js'

createRoot(document.getElementById('root')).render(

<Provider store={store}>
  <MainContextProvider>
    <BrowserRouter>
     <ToastContainer 
      position="top-center"
      autoClose={1000}
      theme="colored"
    />
    <App />
 </BrowserRouter>
</MainContextProvider>
</Provider>
  
)
