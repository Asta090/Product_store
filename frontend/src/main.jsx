import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider" 

import { BrowserRouter } from 'react-router-dom'
import { Toaster, toaster } from "@/components/ui/toaster"
import App from './App'
import React from 'react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
    <Provider>
      <App />
      <Toaster />
    </Provider>

      </BrowserRouter>
  </StrictMode>,
)
