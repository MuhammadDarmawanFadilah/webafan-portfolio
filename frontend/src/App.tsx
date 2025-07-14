import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { apiEndpoints } from './config/config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/admin/Login'
import AdminDashboard from './components/admin/AdminDashboard'
import ProjectForm from './components/admin/ProjectForm'
import ProfileForm from './components/admin/ProfileForm'
import SkillForm from './components/admin/SkillForm'
import AchievementForm from './components/admin/AchievementForm'
import EducationForm from './components/admin/EducationForm'
import ExperienceForm from './components/admin/ExperienceForm'
import LoadingSpinner from './components/LoadingSpinner'
import ProjectDetail from './components/ProjectDetail'

// Main Portfolio Page Component
const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('adminToken')
      if (token) {
        try {
          // Verify token is still valid
          const response = await fetch(apiEndpoints.auth.validate, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.valid) {
              setIsAuthenticated(true)
            } else {
              localStorage.removeItem('adminToken')
              setIsAuthenticated(false)
            }
          } else {
            localStorage.removeItem('adminToken')
            setIsAuthenticated(false)
          }
        } catch (error) {
          console.error('Token validation error:', error)
          localStorage.removeItem('adminToken')
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const handleLogin = (token: string) => {
    setIsAuthenticated(true)
    localStorage.setItem('adminToken', token)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminToken')
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
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
        <Route 
          path="/admin/projects/new" 
          element={
            isAuthenticated ? 
            <ProjectForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/projects/edit/:id" 
          element={
            isAuthenticated ? 
            <ProjectForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/profiles/new" 
          element={
            isAuthenticated ? 
            <ProfileForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/profiles/edit/:id" 
          element={
            isAuthenticated ? 
            <ProfileForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/skills/new" 
          element={
            isAuthenticated ? 
            <SkillForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/skills/edit/:id" 
          element={
            isAuthenticated ? 
            <SkillForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/achievements/new" 
          element={
            isAuthenticated ? 
            <AchievementForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/achievements/edit/:id" 
          element={
            isAuthenticated ? 
            <AchievementForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/educations/new" 
          element={
            isAuthenticated ? 
            <EducationForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/educations/edit/:id" 
          element={
            isAuthenticated ? 
            <EducationForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/experiences/new" 
          element={
            isAuthenticated ? 
            <ExperienceForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/experiences/edit/:id" 
          element={
            isAuthenticated ? 
            <ExperienceForm /> : 
            <Navigate to="/admin/login" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
