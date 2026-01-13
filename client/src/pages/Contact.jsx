import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' })
            setSubmitted(false)
        }, 3000)
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="page-description">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: 'var(--space-16)'
                    }}>
                        {/* Contact Form */}
                        <div>
                            <h2 style={{ marginBottom: 'var(--space-6)' }}>Send us a Message</h2>

                            {submitted ? (
                                <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>✅</div>
                                    <h3 style={{ marginBottom: 'var(--space-2)' }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--color-text-secondary)' }}>
                                        Thank you for reaching out. We'll get back to you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                                    <div className="input-group">
                                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600' }}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600' }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600' }}>
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600' }}>
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Your message..."
                                            rows="5"
                                            required
                                            style={{ resize: 'vertical', minHeight: '120px' }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <div style={{
                                height: '200px',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                marginBottom: 'var(--space-8)',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Our Office" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <h2 style={{ marginBottom: 'var(--space-6)' }}>Contact Information</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="card" style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: 'var(--radius-xl)',
                                            background: 'var(--gradient-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            flexShrink: 0
                                        }}>
                                            {info.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', marginBottom: 'var(--space-1)' }}>{info.title}</div>
                                            <div style={{ color: 'var(--color-text-secondary)' }}>{info.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <h3 style={{ marginTop: 'var(--space-12)', marginBottom: 'var(--space-6)' }}>
                                Frequently Asked Questions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                                {faqs.map((faq, i) => (
                                    <div key={i} className="card" style={{ padding: 'var(--space-5)' }}>
                                        <div style={{ fontWeight: '700', marginBottom: 'var(--space-2)' }}>{faq.q}</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{faq.a}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const contactInfo = [
    { icon: '📧', title: 'Email', value: 'support@skillzone.com' },
    { icon: '📞', title: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '📍', title: 'Location', value: 'San Francisco, CA' },
    { icon: '⏰', title: 'Hours', value: 'Mon-Fri: 9AM - 6PM PST' }
]

const faqs = [
    { q: 'How do I access my courses?', a: 'After enrollment, you can access all courses from your dashboard.' },
    { q: 'Is there a refund policy?', a: 'Yes, we offer a 30-day money-back guarantee on all courses.' },
    { q: 'Do courses include certificates?', a: 'Yes, you receive a certificate upon completing each course.' }
]

export default Contact
