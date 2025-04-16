import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UseContext'
import { CarritoProvider } from './context/CarritoContext' // 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
