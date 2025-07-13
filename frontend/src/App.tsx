import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/admin/Login'
import AdminDashboard from './components/admin/AdminDashboard'

// Main Portfolio Page Component
const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (token: string) => {
    setIsAuthenticated(true)
    localStorage.setItem('authToken', token)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route 
          path="/admin/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin/dashboard" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            isAuthenticated ? 
            <AdminDashboard onLogout={handleLogout} /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
