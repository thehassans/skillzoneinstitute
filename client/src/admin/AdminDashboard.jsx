import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/admin.css'

function AdminDashboard() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingCourse, setEditingCourse] = useState(null)
    const [stats, setStats] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
            return
        }
        fetchData()
    }, [navigate])

    const fetchData = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('adminToken')

            // Fetch courses
            const coursesRes = await fetch('/api/admin/courses', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const coursesData = await coursesRes.json()
            if (coursesData.success) {
                setCourses(coursesData.data)
            }

            // Fetch stats
            const statsRes = await fetch('/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const statsData = await statsRes.json()
            if (statsData.success) {
                setStats(statsData.data)
            }
        } catch (err) {
            // Use sample data for demo
            setCourses(sampleCourses)
            setStats({
                totalCourses: 7,
                activeCourses: 7,
                featuredCourses: 4
            })
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('admin')
        navigate('/admin')
    }

    const handlePriceUpdate = async (courseId, newPrice, newDiscountPrice) => {
        try {
            const token = localStorage.getItem('adminToken')
            await fetch(`/api/admin/courses/${courseId}/price`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price: newPrice, discountPrice: newDiscountPrice })
            })
            setEditingCourse(null)
            fetchData()
        } catch (err) {
            // Update locally for demo
            setCourses(prev => prev.map(c =>
                c._id === courseId || c.slug === courseId
                    ? { ...c, price: newPrice, discountPrice: newDiscountPrice }
                    : c
            ))
            setEditingCourse(null)
        }
    }

    const admin = JSON.parse(localStorage.getItem('admin') || '{}')

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <Link to="/" className="admin-sidebar-logo">
                        <img src="/logo.png" alt="Skill Zone" />
                        <span>Skill Zone</span>
                    </Link>
                </div>

                <nav className="admin-nav">
                    <a href="#" className="admin-nav-item active">
                        <span className="admin-nav-icon">📊</span>
                        Dashboard
                    </a>
                    <a href="#courses" className="admin-nav-item">
                        <span className="admin-nav-icon">📚</span>
                        Courses
                    </a>
                    <a href="#pricing" className="admin-nav-item">
                        <span className="admin-nav-icon">💰</span>
                        Pricing
                    </a>
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user">
                        <div className="admin-user-avatar">👤</div>
                        <div className="admin-user-info">
                            <div className="admin-user-name">{admin.name || 'Admin'}</div>
                            <div className="admin-user-email">{admin.email || 'admin@skillzone.com'}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Dashboard</h1>
                    <Link to="/" className="btn btn-secondary" target="_blank">
                        View Website →
                    </Link>
                </header>

                {loading ? (
                    <div className="admin-loading">Loading...</div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="admin-stats-grid">
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">📚</div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats?.totalCourses || courses.length}</div>
                                    <div className="admin-stat-label">Total Courses</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">✅</div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats?.activeCourses || courses.length}</div>
                                    <div className="admin-stat-label">Active Courses</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">⭐</div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">{stats?.featuredCourses || 4}</div>
                                    <div className="admin-stat-label">Featured</div>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="admin-stat-icon">💰</div>
                                <div className="admin-stat-content">
                                    <div className="admin-stat-value">
                                        ${courses.reduce((sum, c) => sum + (c.discountPrice || c.price), 0)}
                                    </div>
                                    <div className="admin-stat-label">Total Value</div>
                                </div>
                            </div>
                        </div>

                        {/* Courses Table */}
                        <section id="courses" className="admin-section">
                            <div className="admin-section-header">
                                <h2>Course Management</h2>
                            </div>

                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Discount Price</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course._id || course.slug}>
                                                <td>
                                                    <div className="admin-course-cell">
                                                        <div className="admin-course-icon">
                                                            {categoryIcons[course.category] || '📚'}
                                                        </div>
                                                        <div>
                                                            <div className="admin-course-title">{course.title}</div>
                                                            <div className="admin-course-slug">{course.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="admin-badge">{course.category}</span>
                                                </td>
                                                <td>
                                                    {editingCourse === (course._id || course.slug) ? (
                                                        <input
                                                            type="number"
                                                            defaultValue={course.price}
                                                            className="admin-price-input"
                                                            id={`price-${course._id || course.slug}`}
                                                        />
                                                    ) : (
                                                        <strong>${course.price}</strong>
                                                    )}
                                                </td>
                                                <td>
                                                    {editingCourse === (course._id || course.slug) ? (
                                                        <input
                                                            type="number"
                                                            defaultValue={course.discountPrice || ''}
                                                            className="admin-price-input"
                                                            id={`discount-${course._id || course.slug}`}
                                                            placeholder="Optional"
                                                        />
                                                    ) : (
                                                        course.discountPrice ? (
                                                            <span className="admin-discount">${course.discountPrice}</span>
                                                        ) : (
                                                            <span className="admin-no-discount">—</span>
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    {course.isActive !== false ? (
                                                        <span className="admin-status admin-status-active">Active</span>
                                                    ) : (
                                                        <span className="admin-status admin-status-inactive">Inactive</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {editingCourse === (course._id || course.slug) ? (
                                                        <div className="admin-actions">
                                                            <button
                                                                className="admin-btn admin-btn-save"
                                                                onClick={() => {
                                                                    const priceInput = document.getElementById(`price-${course._id || course.slug}`)
                                                                    const discountInput = document.getElementById(`discount-${course._id || course.slug}`)
                                                                    handlePriceUpdate(
                                                                        course._id || course.slug,
                                                                        parseFloat(priceInput.value),
                                                                        discountInput.value ? parseFloat(discountInput.value) : null
                                                                    )
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className="admin-btn admin-btn-cancel"
                                                                onClick={() => setEditingCourse(null)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            className="admin-btn admin-btn-edit"
                                                            onClick={() => setEditingCourse(course._id || course.slug)}
                                                        >
                                                            Edit Price
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}

const categoryIcons = {
    'amazon-wholesale': '📦',
    'amazon-private-label': '🏷️',
    'ai-machine-learning': '🤖',
    'web-development': '💻',
    'ebay': '🛒',
    'etsy': '🎨',
    'walmart': '🏪'
}

const sampleCourses = [
    { slug: 'amazon-wholesale-mastery', title: 'Amazon Wholesale Mastery', category: 'amazon-wholesale', price: 499, discountPrice: 399, isActive: true },
    { slug: 'amazon-private-label-blueprint', title: 'Amazon Private Label Blueprint', category: 'amazon-private-label', price: 699, discountPrice: 549, isActive: true },
    { slug: 'ai-machine-learning-fundamentals', title: 'AI & Machine Learning Fundamentals', category: 'ai-machine-learning', price: 799, discountPrice: 649, isActive: true },
    { slug: 'full-stack-web-development', title: 'Full-Stack Web Development', category: 'web-development', price: 599, discountPrice: 449, isActive: true },
    { slug: 'ebay-selling-success', title: 'eBay Selling Success', category: 'ebay', price: 349, discountPrice: 279, isActive: true },
    { slug: 'etsy-shop-masterclass', title: 'Etsy Shop Masterclass', category: 'etsy', price: 299, discountPrice: 249, isActive: true },
    { slug: 'walmart-marketplace-accelerator', title: 'Walmart Marketplace Accelerator', category: 'walmart', price: 449, discountPrice: 369, isActive: true }
]

export default AdminDashboard
