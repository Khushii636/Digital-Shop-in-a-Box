import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking connection...')
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    fetch('http://localhost:8000/api/health/')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend disconnected ⚠️'))
  }, [])

  // Redirect to /dashboard if user is logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">
          Digital Shop-in-a-Box
        </h1>
        <p className="text-base text-text-muted">
          Your complete shop management & billing solution.
        </p>

        <div className="flex flex-col space-y-3 pt-2">
          <Link
            to="/login"
            className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full text-center hover:opacity-90 transition-opacity"
          >
            Login to Your Shop
          </Link>
          <Link
            to="/register"
            className="bg-primary text-white font-semibold py-3 px-6 rounded-xl w-full text-center hover:opacity-90 transition-opacity"
          >
            Create Free Account
          </Link>
        </div>

        {/* Health Check Badge */}
        <div className="pt-4">
          <div className="text-xs font-medium text-success bg-primary-light py-2 px-4 rounded-lg inline-block">
            {backendStatus}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
