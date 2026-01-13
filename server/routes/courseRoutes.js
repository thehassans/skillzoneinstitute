const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, featured, limit } = req.query;

        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (featured === 'true') {
            query.isFeatured = true;
        }

        let courses = Course.find(query).sort({ createdAt: -1 });

        if (limit) {
            courses = courses.limit(parseInt(limit));
        }

        const result = await courses;

        res.json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   GET /api/courses/categories
// @desc    Get course categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
    try {
        const categories = await Course.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   GET /api/courses/:slug
// @desc    Get single course by slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug, isActive: true });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
