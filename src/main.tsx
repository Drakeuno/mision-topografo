import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from '@/context/AuthContext'
import { GameProvider } from '@/context/GameContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <GameProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </GameProvider>
    </AuthProvider>
  </StrictMode>,
)
