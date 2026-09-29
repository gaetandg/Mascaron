import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Retour d'un lien de connexion (e-mail) ou de Google : on ouvre l'écran « Compte »
if (/[?&](code|error_description)=/.test(location.search) && !location.hash) location.hash = '#/compte'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
