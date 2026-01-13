import { Link } from 'react-router-dom'

// Category display names and icons
const categoryInfo = {
    'amazon-wholesale': { name: 'Amazon Wholesale', icon: '📦' },
    'amazon-private-label': { name: 'Private Label', icon: '🏷️' },
    'ai-machine-learning': { name: 'AI & ML', icon: '🤖' },
    'web-development': { name: 'Web Development', icon: '💻' },
    'ebay': { name: 'eBay', icon: '🛒' },
    'etsy': { name: 'Etsy', icon: '🎨' },
    'walmart': { name: 'Walmart', icon: '🏪' }
}

function CourseCard({ course }) {
    const category = categoryInfo[course.category] || { name: course.category, icon: '📚' }

    return (
        <Link to={`/courses/${course.slug}`} className="course-card">
            <div className="course-card-image">
                {course.image ? (
                    <img src={course.image} alt={course.title} />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem'
                    }}>
                        {category.icon}
                    </div>
                )}
                {course.isFeatured && (
                    <span className="course-card-badge badge badge-gold">
                        ⭐ Featured
                    </span>
                )}
            </div>

            <div className="course-card-content">
                <span className="course-card-category">{category.name}</span>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-description">{course.shortDescription || course.description?.substring(0, 120) + '...'}</p>

                <div className="course-card-meta">
                    <span className="course-card-meta-item">
                        ⏱️ {course.duration}
                    </span>
                    <span className="course-card-meta-item">
                        📊 {course.level}
                    </span>
                    <span className="course-card-meta-item">
                        ⭐ {course.rating}
                    </span>
                </div>
            </div>

            <div className="course-card-footer">
                <div className="course-card-price">
                    <span className="price-current">${course.discountPrice || course.price}</span>
                    {course.discountPrice && (
                        <span className="price-original">${course.price}</span>
                    )}
                </div>
                <span className="btn btn-primary" style={{ padding: 'var(--space-2) var(--space-4)' }}>
                    Enroll Now
                </span>
            </div>
        </Link>
    )
}

export default CourseCard
export { categoryInfo }
