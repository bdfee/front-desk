import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import Providers from './components/context-providers'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  </StrictMode>,
)
