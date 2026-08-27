import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await registerUser(email, password)
      setSuccess('Account created successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Create Account
        </h1>
        <p className="text-base text-text-muted mb-6 text-center">
          Set up your Sharma General Store account.
        </p>

        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-xl mb-4 text-sm font-medium border border-danger/20">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-success/10 text-success p-3 rounded-xl mb-4 text-sm font-medium border border-success/20">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shopkeeper@example.com"
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full hover:opacity-90 transition-opacity disabled:opacity-50 text-center cursor-pointer mt-2"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in here
          </Link>
        </p>

        <Link
          to="/"
          className="text-xs text-text-muted hover:text-text-primary block text-center mt-4"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Register
