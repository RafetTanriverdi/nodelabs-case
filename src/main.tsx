import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AppClientRouter from '@rt/AppClientRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppClientRouter />
  </StrictMode>,
)
