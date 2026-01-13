const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Admin = require('./models/Admin');

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillzone');

const courses = [
    {
        title: 'Amazon Wholesale Mastery',
        description: 'Learn the complete Amazon wholesale business model from sourcing to scaling. Master supplier relationships, product research, and account management to build a profitable wholesale business on Amazon.',
        shortDescription: 'Master Amazon wholesale from sourcing to scaling your business',
        category: 'amazon-wholesale',
        price: 499,
        discountPrice: 399,
        duration: '8 weeks',
        level: 'beginner',
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
        instructor: { name: 'Michael Chen', title: 'Amazon Expert', bio: '10+ years in e-commerce' },
        isFeatured: true,
        enrollmentCount: 1250,
        rating: 4.8,
        reviewCount: 324
    },
    {
        title: 'Amazon Private Label Blueprint',
        description: 'Build your own brand on Amazon with our comprehensive private label course. From product ideation to brand registry, learn everything you need to create a successful private label business.',
        shortDescription: 'Build and scale your own brand on Amazon marketplace',
        category: 'amazon-private-label',
        price: 699,
        discountPrice: 549,
        duration: '12 weeks',
        level: 'intermediate',
        features: [
            'Brand Development',
            'Product Sourcing from China',
            'Listing Optimization',
            'PPC Advertising',
            'Brand Registry',
            'Launch Strategies'
        ],
        highlights: [
            { icon: '🏷️', title: 'Brand Building', description: 'Create a memorable brand identity' },
            { icon: '🌏', title: 'Global Sourcing', description: 'Connect with reliable manufacturers' },
            { icon: '📈', title: 'Growth Hacking', description: 'Scale with proven marketing tactics' }
        ],
        instructor: { name: 'Sarah Johnson', title: 'Brand Strategist', bio: '8 figure seller & mentor' },
        isFeatured: true,
        enrollmentCount: 890,
        rating: 4.9,
        reviewCount: 256
    },
    {
        title: 'AI & Machine Learning Fundamentals',
        description: 'Dive into the world of artificial intelligence and machine learning. Learn Python, TensorFlow, and practical ML techniques to build intelligent applications and advance your tech career.',
        shortDescription: 'Master AI/ML with Python and real-world projects',
        category: 'ai-machine-learning',
        price: 799,
        discountPrice: 649,
        duration: '16 weeks',
        level: 'intermediate',
        features: [
            'Python for Data Science',
            'Machine Learning Algorithms',
            'Deep Learning with TensorFlow',
            'Natural Language Processing',
            'Computer Vision',
            'Real-World Projects'
        ],
        highlights: [
            { icon: '🤖', title: 'Hands-On AI', description: 'Build real AI applications from scratch' },
            { icon: '🧠', title: 'Neural Networks', description: 'Deep dive into deep learning' },
            { icon: '💼', title: 'Career Ready', description: 'Portfolio projects for job applications' }
        ],
        instructor: { name: 'Dr. Alex Rivera', title: 'AI Researcher', bio: 'PhD Stanford, Ex-Google AI' },
        isFeatured: true,
        enrollmentCount: 2100,
        rating: 4.9,
        reviewCount: 512
    },
    {
        title: 'Full-Stack Web Development',
        description: 'Become a complete web developer with our comprehensive full-stack course. Master HTML, CSS, JavaScript, React, Node.js, and databases to build modern web applications from scratch.',
        shortDescription: 'Complete web development from frontend to backend',
        category: 'web-development',
        price: 599,
        discountPrice: 449,
        duration: '20 weeks',
        level: 'beginner',
        features: [
            'HTML5 & CSS3',
            'JavaScript ES6+',
            'React & Redux',
            'Node.js & Express',
            'MongoDB & SQL',
            'DevOps Basics'
        ],
        highlights: [
            { icon: '💻', title: 'Modern Stack', description: 'Learn the latest technologies' },
            { icon: '🎨', title: 'UI/UX Design', description: 'Create beautiful interfaces' },
            { icon: '🔧', title: 'Full Projects', description: 'Build 10+ real applications' }
        ],
        instructor: { name: 'Emma Watson', title: 'Senior Developer', bio: 'Ex-Meta, 15 years experience' },
        isFeatured: true,
        enrollmentCount: 3500,
        rating: 4.8,
        reviewCount: 890
    },
    {
        title: 'eBay Selling Success',
        description: 'Master the art of selling on eBay with proven strategies for finding inventory, creating listings that convert, and building a sustainable eBay business.',
        shortDescription: 'Build a profitable eBay business from scratch',
        category: 'ebay',
        price: 349,
        discountPrice: 279,
        duration: '6 weeks',
        level: 'beginner',
        features: [
            'Product Sourcing',
            'Listing Optimization',
            'Photography Tips',
            'Pricing Strategies',
            'Customer Service',
            'Shipping & Returns'
        ],
        highlights: [
            { icon: '🔨', title: 'Auction Mastery', description: 'Maximize profits with auction strategies' },
            { icon: '📸', title: 'Photo Pro', description: 'Take photos that sell' },
            { icon: '⭐', title: 'Top Rated', description: 'Become a top rated seller' }
        ],
        instructor: { name: 'David Miller', title: 'eBay PowerSeller', bio: 'Top 1% seller since 2010' },
        isFeatured: false,
        enrollmentCount: 780,
        rating: 4.7,
        reviewCount: 198
    },
    {
        title: 'Etsy Shop Masterclass',
        description: 'Turn your creativity into profit on Etsy. Learn to create, market, and sell handmade goods and digital products to a global audience of buyers.',
        shortDescription: 'Sell handmade & digital products on Etsy',
        category: 'etsy',
        price: 299,
        discountPrice: 249,
        duration: '6 weeks',
        level: 'beginner',
        features: [
            'Shop Setup & Branding',
            'SEO for Etsy',
            'Product Photography',
            'Pricing Handmade Items',
            'Digital Products',
            'Etsy Ads'
        ],
        highlights: [
            { icon: '🎨', title: 'Creative Business', description: 'Monetize your craft' },
            { icon: '🔍', title: 'Etsy SEO', description: 'Get found by buyers' },
            { icon: '📱', title: 'Digital Downloads', description: 'Passive income products' }
        ],
        instructor: { name: 'Lisa Park', title: 'Etsy Star Seller', bio: '50k+ sales, featured seller' },
        isFeatured: false,
        enrollmentCount: 650,
        rating: 4.8,
        reviewCount: 167
    },
    {
        title: 'Walmart Marketplace Accelerator',
        description: 'Expand to Walmart Marketplace with our complete guide. Learn the differences from Amazon, how to get approved, and strategies for success on this growing platform.',
        shortDescription: 'Expand and succeed on Walmart Marketplace',
        category: 'walmart',
        price: 449,
        discountPrice: 369,
        duration: '8 weeks',
        level: 'intermediate',
        features: [
            'Seller Application',
            'Listing Migration',
            'Pricing Strategy',
            'Walmart Fulfillment',
            'Advertising on Walmart',
            'Multi-Channel Selling'
        ],
        highlights: [
            { icon: '🏪', title: 'Platform Mastery', description: 'Understand Walmart ecosystem' },
            { icon: '🚚', title: 'WFS Setup', description: 'Leverage Walmart fulfillment' },
            { icon: '📊', title: 'Analytics', description: 'Data-driven optimization' }
        ],
        instructor: { name: 'Robert Kim', title: 'E-commerce Consultant', bio: 'Multi-million dollar seller' },
        isFeatured: false,
        enrollmentCount: 420,
        rating: 4.6,
        reviewCount: 98
    }
];

const admin = {
    name: 'Skill Zone Admin',
    email: process.env.ADMIN_EMAIL || 'admin@skillzone.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'superadmin'
};

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Course.deleteMany();
        await Admin.deleteMany();

        console.log('🗑️  Cleared existing data');

        // Create courses
        await Course.insertMany(courses);
        console.log('✅ Courses seeded');

        // Create admin
        await Admin.create(admin);
        console.log('✅ Admin created');

        console.log('🌱 Database seeded successfully!');
        console.log(`\n📧 Admin Email: ${admin.email}`);
        console.log(`🔑 Admin Password: ${admin.password}`);

        process.exit();
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

seedDatabase();
