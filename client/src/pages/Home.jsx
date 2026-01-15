import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseCard, { categoryInfo } from '../components/CourseCard'

function Home() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedCourses()
    }, [])

    const fetchFeaturedCourses = async () => {
        try {
            const res = await fetch('/api/courses?featured=true&limit=4')
            const data = await res.json()
            if (data.success && data.data && data.data.length > 0) {
                setCourses(data.data)
            } else {
                setCourses(sampleCourses)
            }
        } catch (err) {
            // Use sample data if API is not available
            setCourses(sampleCourses)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text animate-fade-in-up">
                            <div className="hero-badge">
                                <span className="emoji">🚀</span>
                                <span>Transform Your Career Today</span>
                            </div>

                            <h1 className="hero-title">
                                Master <span className="text-gradient">E-Commerce</span> &
                                <span className="text-gradient"> Tech Skills</span>
                            </h1>

                            <p className="hero-description">
                                Join thousands of successful entrepreneurs and developers who have transformed
                                their careers with our ultra-premium courses. From Amazon FBA to AI/ML,
                                we've got you covered.
                            </p>

                            <div className="hero-actions">
                                <Link to="/courses" className="btn btn-primary btn-lg">
                                    Explore Courses
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <a href="#categories" className="btn btn-secondary btn-lg">
                                    View Categories
                                </a>
                            </div>

                            <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-value">10K+</div>
                                    <div className="stat-label">Active Students</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">50+</div>
                                    <div className="stat-label">Premium Courses</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">4.9</div>
                                    <div className="stat-label">Average Rating</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-image animate-fade-in-up delay-200">
                            <div className="hero-image-wrapper" style={{
                                width: '100%',
                                height: '500px',
                                borderRadius: 'var(--radius-2xl)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-2xl)'
                            }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Students learning" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="floating-card card-1">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <span style={{ fontSize: '2rem' }}>🏆</span>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: 'var(--text-lg)' }}>Top Rated</div>
                                        <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>4.9 Stars</div>
                                    </div>
                                </div>
                            </div>

                            <div className="floating-card card-2">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <span style={{ fontSize: '2rem' }}>💰</span>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: 'var(--text-lg)' }}>Best Value</div>
                                        <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>Save 30%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">📚 Categories</span>
                        <h2 className="section-title">Explore Our <span className="text-gradient">Course Categories</span></h2>
                        <p className="section-description">
                            From e-commerce marketplaces to cutting-edge tech, find the perfect course to elevate your skills.
                        </p>
                    </div>

                    <div className="categories-grid">
                        {Object.entries(categoryInfo).map(([key, { name, icon }]) => (
                            <Link to={`/courses?category=${key}`} className="category-card" key={key}>
                                <div className="category-icon">{icon}</div>
                                <h3 className="category-name">{name}</h3>
                                <p className="category-count">View courses →</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">⭐ Featured</span>
                        <h2 className="section-title">Our <span className="text-gradient">Top Courses</span></h2>
                        <p className="section-description">
                            Hand-picked courses designed to fast-track your success.
                        </p>
                    </div>

                    <div className="grid grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="course-card">
                                    <div className="skeleton" style={{ height: '200px' }}></div>
                                    <div style={{ padding: 'var(--space-6)' }}>
                                        <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                                        <div className="skeleton skeleton-title"></div>
                                        <div className="skeleton skeleton-text"></div>
                                        <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            ))
                        ) : courses.length > 0 ? (
                            courses.map(course => (
                                <CourseCard key={course._id || course.slug} course={course} />
                            ))
                        ) : (
                            sampleCourses.map(course => (
                                <CourseCard key={course.slug} course={course} />
                            ))
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
                        <Link to="/courses" className="btn btn-primary btn-lg">
                            View All Courses
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">✨ Why Choose Us</span>
                        <h2 className="section-title">The <span className="text-gradient">Skill Zone</span> Advantage</h2>
                        <p className="section-description">
                            We provide everything you need to succeed in e-commerce and tech.
                        </p>
                    </div>

                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {features.map((feature, index) => (
                            <div className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }} key={index}>
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Ready to Start Your Journey?</h2>
                            <p className="cta-description">
                                Join over 10,000 students who have already transformed their careers with Skill Zone Institutes.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-6)', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <div style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>📞</span> +923167471183
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span>📍</span> Office No 1, The Platform, AZ Mall, Kohinoor Faisalabad
                                </div>
                            </div>
                            <Link to="/courses" className="btn btn-lg cta-btn">
                                Get Started Today
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

// Sample courses for when API is not available
const sampleCourses = [
    {
        slug: 'amazon-wholesale-mastery',
        title: 'Amazon Wholesale Mastery',
        shortDescription: 'Master Amazon wholesale from sourcing to scaling your business',
        category: 'amazon-wholesale',
        price: 200,
        discountPrice: null,
        duration: '8 weeks',
        level: 'beginner',
        rating: 4.8,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        instructor: { name: 'Hafiza Aqsa Arooj', title: 'Amazon Expert' }
    },
    {
        slug: 'amazon-private-label-blueprint',
        title: 'Amazon Private Label Blueprint',
        shortDescription: 'Build and scale your own brand on Amazon marketplace',
        category: 'amazon-private-label',
        price: 699,
        discountPrice: 549,
        duration: '12 weeks',
        level: 'intermediate',
        rating: 4.9,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        instructor: { name: 'Hafiza Aqsa Arooj', title: 'Amazon Expert' }
    },
    {
        slug: 'ai-machine-learning-fundamentals',
        title: 'AI & Machine Learning Fundamentals',
        shortDescription: 'Master AI/ML with Python and real-world projects',
        category: 'ai-machine-learning',
        price: 799,
        discountPrice: 649,
        duration: '16 weeks',
        level: 'intermediate',
        rating: 4.9,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        instructor: { name: 'Hassan Sarwar', title: 'AI & Development Expert' }
    },
    {
        slug: 'full-stack-web-development',
        title: 'Full-Stack Web Development',
        shortDescription: 'Complete web development from frontend to backend',
        category: 'web-development',
        price: 599,
        discountPrice: 449,
        duration: '20 weeks',
        level: 'beginner',
        rating: 4.8,
        isFeatured: true,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        instructor: { name: 'Hassan Sarwar', title: 'AI & Development Expert' }
    }
]

const features = [
    {
        icon: '🎯',
        title: 'Expert Instructors',
        description: 'Learn from industry veterans with proven track records of success in their fields.'
    },
    {
        icon: '🏫',
        title: 'On-site Classes',
        description: 'Join our physical classes at Jinnah Colony near GC University Gate no.4 for hands-on learning.'
    },
    {
        icon: '💻',
        title: 'Google Meet Classes',
        description: 'Attend live online sessions via Google Meet from anywhere in the world.'
    },
    {
        icon: '💬',
        title: 'Community Support',
        description: 'Join our vibrant community of learners and get help when you need it.'
    },
    {
        icon: '🔄',
        title: 'Lifetime Access',
        description: 'Get lifetime access to all course materials and future updates at no extra cost.'
    },
    {
        icon: '📞',
        title: 'Direct Contact',
        description: 'Reach us anytime at +923167471183 for enrollment or course inquiries.'
    }
]

export default Home
