const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a course title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    shortDescription: {
        type: String,
        maxlength: [200, 'Short description cannot be more than 200 characters']
    },
    category: {
        type: String,
        required: true,
        enum: [
            'amazon-wholesale',
            'amazon-private-label',
            'ai-machine-learning',
            'web-development',
            'ebay',
            'etsy',
            'walmart'
        ]
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    discountPrice: {
        type: Number,
        default: null
    },
    currency: {
        type: String,
        default: 'USD'
    },
    duration: {
        type: String,
        default: '8 weeks'
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    features: [{
        type: String
    }],
    highlights: [{
        icon: String,
        title: String,
        description: String
    }],
    instructor: {
        name: String,
        title: String,
        avatar: String,
        bio: String
    },
    image: {
        type: String,
        default: '/images/course-default.jpg'
    },
    enrollmentCount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 1,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Create slug from title
courseSchema.pre('save', function (next) {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    next();
});

module.exports = mongoose.model('Course', courseSchema);
