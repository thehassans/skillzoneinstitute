import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CourseCard, { categoryInfo } from '../components/CourseCard'

function Courses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'all'

    useEffect(() => {
        fetchCourses()
    }, [activeCategory])

    const fetchCourses = async () => {
        setLoading(true)
        try {
            const url = activeCategory === 'all'
                ? '/api/courses'
                : `/api/courses?category=${activeCategory}`
            const res = await fetch(url)
            const data = await res.json()
            if (data.success && data.data && data.data.length > 0) {
                setCourses(data.data)
            } else {
                // Use sample data if API returns empty
                const filtered = activeCategory === 'all'
                    ? sampleCourses
                    : sampleCourses.filter(c => c.category === activeCategory)
                setCourses(filtered)
            }
        } catch (err) {
            // Use sample data if API is not available
            const filtered = activeCategory === 'all'
                ? sampleCourses
                : sampleCourses.filter(c => c.category === activeCategory)
            setCourses(filtered)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryChange = (category) => {
        if (category === 'all') {
            setSearchParams({})
        } else {
            setSearchParams({ category })
        }
    }

    return (
        <>
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">
                        Explore Our <span className="text-gradient">Courses</span>
                    </h1>
                    <p className="page-description">
                        Discover premium courses designed to help you master e-commerce and tech skills.
                    </p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    {/* Filter Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-3)',
                        flexWrap: 'wrap',
                        marginBottom: 'var(--space-12)',
                        justifyContent: 'center'
                    }}>
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            All Courses
                        </button>
                        {Object.entries(categoryInfo).map(([key, { name, icon }]) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`btn ${activeCategory === key ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {icon} {name}
                            </button>
                        ))}
                    </div>

                    {/* Course Grid */}
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
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
                            <div style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: 'var(--space-16)',
                                color: 'var(--color-text-secondary)'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>📚</div>
                                <h3 style={{ marginBottom: 'var(--space-2)' }}>No courses found</h3>
                                <p>Try selecting a different category.</p>
                            </div>
                        )}
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
        price: 499,
        discountPrice: 399,
        duration: '8 weeks',
        level: 'beginner',
        rating: 4.8,
        isFeatured: true
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
        isFeatured: true
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
        isFeatured: true
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
        isFeatured: true
    },
    {
        slug: 'ebay-selling-success',
        title: 'eBay Selling Success',
        shortDescription: 'Build a profitable eBay business from scratch',
        category: 'ebay',
        price: 349,
        discountPrice: 279,
        duration: '6 weeks',
        level: 'beginner',
        rating: 4.7
    },
    {
        slug: 'etsy-shop-masterclass',
        title: 'Etsy Shop Masterclass',
        shortDescription: 'Sell handmade & digital products on Etsy',
        category: 'etsy',
        price: 299,
        discountPrice: 249,
        duration: '6 weeks',
        level: 'beginner',
        rating: 4.8
    },
    {
        slug: 'walmart-marketplace-accelerator',
        title: 'Walmart Marketplace Accelerator',
        shortDescription: 'Expand and succeed on Walmart Marketplace',
        category: 'walmart',
        price: 449,
        discountPrice: 369,
        duration: '8 weeks',
        level: 'intermediate',
        rating: 4.6
    }
]

export default Courses
