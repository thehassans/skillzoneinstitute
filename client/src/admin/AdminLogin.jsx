import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/admin.css'

function AdminLogin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })
            const data = await res.json()

            if (data.success) {
                localStorage.setItem('adminToken', data.token)
                localStorage.setItem('admin', JSON.stringify(data.admin))
                navigate('/admin/dashboard')
            } else {
                setError(data.message || 'Invalid credentials')
            }
        } catch (err) {
            // For demo, allow login with default credentials
            if (credentials.email === 'admin@skillzone.com' && credentials.password === 'admin123') {
                localStorage.setItem('adminToken', 'demo-token')
                localStorage.setItem('admin', JSON.stringify({ name: 'Demo Admin', email: credentials.email }))
                navigate('/admin/dashboard')
            } else {
                setError('Invalid credentials. Try admin@skillzone.com / admin123')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <Link to="/" className="admin-login-logo">
                    <img src="/logo.png" alt="Skill Zone" />
                    <span>Skill Zone</span>
                </Link>

                <h1 className="admin-login-title">Admin Login</h1>
                <p className="admin-login-subtitle">Enter your credentials to access the dashboard</p>

                {error && (
                    <div className="admin-alert admin-alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            placeholder="admin@skillzone.com"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="admin-login-footer">
                    <Link to="/">← Back to Website</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin
