import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking connection...')
  const { logout } = useAuth()

  useEffect(() => {
    fetch('http://localhost:8000/api/health/')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend disconnected ⚠️'))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-md w-full text-center">
        <div className="flex justify-end mb-2">
          <button
            onClick={logout}
            className="text-xs text-danger font-semibold hover:underline cursor-pointer"
          >
            Logout ➔
          </button>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Sharma General Store
        </h1>
        <p className="text-base text-text-muted mb-6">
          Your digital shop is ready to be built.
        </p>
        <Link
          to="/onboarding"
          className="bg-primary text-white font-semibold py-3 px-6 rounded-xl w-full mb-3 block text-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          ⚙️ Setup / Onboard New Shop
        </Link>
        <button
          className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full mb-6 block text-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          + New Sale
        </button>

        {/* Health Check Badge */}
        <div className="text-sm font-medium text-success bg-primary-light py-2 px-4 rounded-lg inline-block">
          {backendStatus}
        </div>

      </div>
    </div>
  )
}

export default Home
