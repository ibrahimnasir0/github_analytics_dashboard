import { Dashboard } from './components/Dashboard'
import { Footer } from './components/layout/Footer'
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Dashboard initialUsername="ibrahimnasir0" />
      <Footer />
    </div>
  )
}

export default App
