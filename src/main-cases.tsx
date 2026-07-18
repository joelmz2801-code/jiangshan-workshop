import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cases from './pages/Cases'
import { LanguageProvider } from '@/i18n/LanguageContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Cases />
    </LanguageProvider>
  </StrictMode>,
)
