import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Login Page
        </h1>
        <p className="text-base text-text-muted mb-6">
          Welcome back! Please enter your details.
        </p>
        <Link
          to="/"
          className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full block text-center"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Login
