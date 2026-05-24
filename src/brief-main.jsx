import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Brief from './Brief.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Brief />
  </StrictMode>
)
