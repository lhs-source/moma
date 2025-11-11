import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '../src/styles/globals.css'
import App from './App'

const container = document.getElementById('app')

if (!container) {
  throw new Error('루트 엘리먼트 #app 을 찾을 수 없습니다.')
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

