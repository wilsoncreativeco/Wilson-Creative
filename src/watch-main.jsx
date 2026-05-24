import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Watch from './Watch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Watch />
  </StrictMode>
)
