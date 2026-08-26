import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking connection...')

  useEffect(() => {
    fetch('http://localhost:8000/api/health/')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend disconnected ⚠️'))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Sharma General Store
        </h1>
        <p className="text-base text-text-muted mb-6">
          Your digital shop is ready to be built.
        </p>
        <Link
          to="/login"
          className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full mb-6 block text-center"
        >
          + New Sale
        </Link>
        
        {/* Health Check Badge */}
        <div className="text-sm font-medium text-success bg-primary-light py-2 px-4 rounded-lg inline-block">
          {backendStatus}
        </div>
      </div>
    </div>
  )
}

export default Home
