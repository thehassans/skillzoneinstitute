import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { categoryInfo } from '../components/CourseCard'

function CourseDetail() {
    const { slug } = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedClassMode, setSelectedClassMode] = useState('onsite')

    useEffect(() => {
        fetchCourse()
    }, [slug])

    const fetchCourse = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/courses/${slug}`)
            const data = await res.json()
            if (data.success) {
                setCourse(data.data)
            } else {
                setCourse(sampleCourse)
            }
        } catch (err) {
            // Use sample course
            setCourse(sampleCourse)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <div className="skeleton" style={{ width: '200px', height: '40px' }}></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>📚</div>
                <h1>Course Not Found</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                    The course you're looking for doesn't exist.
                </p>
                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
        )
    }

    const category = categoryInfo[course.category] || { name: course.category, icon: '📚' }

    return (
        <>
            {/* Hero */}
            <section style={{
                paddingTop: 'calc(80px + var(--space-16))',
                paddingBottom: 'var(--space-16)',
                background: 'var(--color-bg-secondary)'
            }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 'var(--space-12)', alignItems: 'start' }}>
                        <div>
                            <Link
                                to="/courses"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-2)',
                                    marginBottom: 'var(--space-4)',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--text-sm)'
                                }}
                            >
                                ← Back to Courses
                            </Link>

                            <div className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>
                                {category.icon} {category.name}
                            </div>

                            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--space-4)' }}>
                                {course.title}
                            </h1>

                            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.8 }}>
                                {course.description}
                            </p>

                            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>⭐</span>
                                    <span style={{ fontWeight: '600' }}>{course.rating}</span>
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>({course.reviewCount || 0} reviews)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>👥</span>
                                    <span>{course.enrollmentCount || 0} students</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>⏱️</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>📊</span>
                                    <span style={{ textTransform: 'capitalize' }}>{course.level}</span>
                                </div>
                            </div>

                            {/* Class Mode Selection */}
                            <div style={{ 
                                padding: 'var(--space-6)', 
                                background: 'var(--color-surface)', 
                                borderRadius: 'var(--radius-xl)',
                                marginBottom: 'var(--space-6)'
                            }}>
                                <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>Choose Your Class Mode</h3>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => setSelectedClassMode('onsite')}
                                        className={selectedClassMode === 'onsite' ? 'btn btn-primary' : 'btn btn-secondary'}
                                        style={{ flex: 1, minWidth: '140px', padding: 'var(--space-4)' }}
                                    >
                                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 'var(--space-2)' }}>🏫</span>
                                        On-site Classes
                                    </button>
                                    <button
                                        onClick={() => setSelectedClassMode('googlemeet')}
                                        className={selectedClassMode === 'googlemeet' ? 'btn btn-primary' : 'btn btn-secondary'}
                                        style={{ flex: 1, minWidth: '140px', padding: 'var(--space-4)' }}
                                    >
                                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: 'var(--space-2)' }}>💻</span>
                                        Google Meet Classes
                                    </button>
                                </div>
                                <p style={{ 
                                    marginTop: 'var(--space-4)', 
                                    fontSize: 'var(--text-sm)', 
                                    color: 'var(--color-text-secondary)' 
                                }}>
                                    {selectedClassMode === 'onsite' 
                                        ? '📍 Location: Jinnah Colony near GC University Gate no.4'
                                        : '💻 Join live sessions via Google Meet from anywhere'
                                    }
                                </p>
                            </div>

                            {course.instructor && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)' }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem'
                                    }}>
                                        👨‍🏫
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700' }}>{course.instructor.name}</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                                            {course.instructor.title}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pricing Card */}
                        <div className="card" style={{ position: 'sticky', top: '100px', padding: 'var(--space-8)' }}>
                            <div style={{
                                width: '100%',
                                height: '180px',
                                background: 'var(--gradient-primary)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                marginBottom: 'var(--space-6)'
                            }}>
                                {category.icon}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                <span style={{ fontSize: 'var(--text-4xl)', fontWeight: '800' }}>
                                    ${course.discountPrice || course.price}
                                </span>
                                {course.discountPrice && (
                                    <span style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-tertiary)', textDecoration: 'line-through' }}>
                                        ${course.price}
                                    </span>
                                )}
                                {course.discountPrice && (
                                    <span className="badge badge-success">
                                        Save ${course.price - course.discountPrice}
                                    </span>
                                )}
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 'var(--space-2)', 
                                marginBottom: 'var(--space-4)',
                                padding: 'var(--space-3)',
                                background: 'var(--color-bg-secondary)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: 'var(--text-sm)'
                            }}>
                                {selectedClassMode === 'onsite' ? '🏫' : '💻'}
                                <span>{selectedClassMode === 'onsite' ? 'On-site Classes' : 'Google Meet Classes'}</span>
                            </div>

                            <a href="tel:+923167471183" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
                                📞 Call to Enroll
                            </a>
                            
                            <a href="https://wa.me/923167471183" className="btn btn-secondary btn-lg" style={{ width: '100%', marginBottom: 'var(--space-4)' }}>
                                💬 WhatsApp Now
                            </a>

                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                                📍 Jinnah Colony near GC University Gate no.4
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Highlights */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-12)' }}>
                        {/* What You'll Learn */}
                        <div>
                            <h2 style={{ marginBottom: 'var(--space-6)' }}>What You'll Learn</h2>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {(course.features || defaultFeatures).map((feature, i) => (
                                    <li key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                                        <span style={{ color: 'var(--color-success)', fontSize: 'var(--text-lg)' }}>✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Highlights */}
                        <div>
                            <h2 style={{ marginBottom: 'var(--space-6)' }}>Course Highlights</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {(course.highlights || defaultHighlights).map((highlight, i) => (
                                    <div key={i} className="card" style={{ padding: 'var(--space-5)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                                        <span style={{ fontSize: '2rem' }}>{highlight.icon}</span>
                                        <div>
                                            <div style={{ fontWeight: '700' }}>{highlight.title}</div>
                                            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                                                {highlight.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ marginBottom: 'var(--space-4)' }}>Ready to Enroll?</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            Contact us today to get started with your learning journey!
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="tel:+923167471183" className="btn btn-primary btn-lg">
                                📞 +923167471183
                            </a>
                            <a href="https://wa.me/923167471183" className="btn btn-secondary btn-lg">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const defaultFeatures = [
    'Complete course curriculum',
    'Hands-on projects',
    'Downloadable resources',
    'Lifetime access',
    '24/7 support',
    'Choose between on-site or Google Meet classes'
]

const defaultHighlights = [
    { icon: '🎯', title: 'Practical Skills', description: 'Learn by doing with real-world projects' },
    { icon: '🏫', title: 'On-site Classes', description: 'Join physical classes at Jinnah Colony' },
    { icon: '💻', title: 'Google Meet', description: 'Attend live online sessions from anywhere' }
]

const sampleCourse = {
    title: 'Amazon Wholesale Mastery',
    slug: 'amazon-wholesale-mastery',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Learn the complete Amazon wholesale business model from sourcing to scaling. Master supplier relationships, product research, and account management to build a profitable wholesale business on Amazon.',
    category: 'amazon-wholesale',
    price: 499,
    discountPrice: 399,
    duration: '8 weeks',
    level: 'beginner',
    rating: 4.8,
    reviewCount: 324,
    enrollmentCount: 1250,
    features: [
        'Supplier Research & Outreach',
        'Product Analysis Techniques',
        'Account Health Management',
        'Inventory Management',
        'Pricing Strategies',
        'Scaling Your Business'
    ],
    highlights: [
        { icon: '📦', title: 'Sourcing Secrets', description: 'Find profitable products from verified suppliers' },
        { icon: '📊', title: 'Data Analysis', description: 'Use analytics to make smart decisions' },
        { icon: '🚀', title: 'Scale Fast', description: 'Proven strategies to grow your business' }
    ],
    instructor: { name: 'Michael Chen', title: 'Amazon Expert' }
}

export default CourseDetail
