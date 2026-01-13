import { Link } from 'react-router-dom'

function About() {
    return (
        <>
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">
                        About <span className="text-gradient">Skill Zone</span>
                    </h1>
                    <p className="page-description">
                        Empowering entrepreneurs and developers worldwide with premium education.
                    </p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: 'var(--space-16)',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ marginBottom: 'var(--space-6)' }}>
                                Our <span className="text-gradient">Mission</span>
                            </h2>
                            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                                At Skill Zone, we believe that education should be accessible, practical, and transformative.
                                We're on a mission to empower individuals worldwide with the skills they need to succeed
                                in the rapidly evolving world of e-commerce and technology.
                            </p>
                            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                                Our courses are designed by industry experts who have built successful businesses
                                and careers. We focus on real-world applications, ensuring that every student
                                can immediately apply what they learn.
                            </p>
                            <Link to="/courses" className="btn btn-primary btn-lg">
                                Explore Our Courses
                            </Link>
                        </div>
                        <div style={{
                            height: '400px',
                            borderRadius: 'var(--radius-2xl)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-2xl)'
                        }}>
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Our Team" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-8)',
                        textAlign: 'center'
                    }}>
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div style={{ fontSize: 'var(--text-5xl)', fontWeight: '800' }} className="text-gradient">
                                    {stat.value}
                                </div>
                                <div style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our <span className="text-gradient">Values</span></h2>
                        <p className="section-description">
                            The principles that guide everything we do.
                        </p>
                    </div>

                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {values.map((value, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{value.icon}</div>
                                <h3 className="feature-title">{value.title}</h3>
                                <p className="feature-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">Join Our Community</h2>
                            <p className="cta-description">
                                Become part of a thriving community of learners and entrepreneurs.
                            </p>
                            <Link to="/courses" className="btn btn-lg cta-btn">
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const stats = [
    { value: '10K+', label: 'Active Students' },
    { value: '50+', label: 'Premium Courses' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'Support' }
]

const values = [
    {
        icon: '🎯',
        title: 'Excellence',
        description: 'We strive for excellence in everything we do, from course content to student support.'
    },
    {
        icon: '💡',
        title: 'Innovation',
        description: 'We constantly evolve our curriculum to stay ahead of industry trends.'
    },
    {
        icon: '🤝',
        title: 'Community',
        description: 'We believe in the power of community and peer-to-peer learning.'
    },
    {
        icon: '🌟',
        title: 'Impact',
        description: 'We measure our success by the success of our students.'
    }
]

export default About
