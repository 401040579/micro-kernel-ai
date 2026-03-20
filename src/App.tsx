import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import WorkspacePage from './pages/WorkspacePage'
import TemplatesPage from './pages/TemplatesPage'
import ProjectsPage from './pages/ProjectsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/workspace"
          element={
            <>
              <Navbar />
              <WorkspacePage />
            </>
          }
        />
        <Route
          path="/templates"
          element={
            <>
              <Navbar />
              <TemplatesPage />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <ProjectsPage />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
