import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MainContextProvider } from './Contexts/MainContext.jsx'

createRoot(document.getElementById('root')).render(

<MainContextProvider>
    <BrowserRouter>
    <App />
 </BrowserRouter>
</MainContextProvider>
  
)
