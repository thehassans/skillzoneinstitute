const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

// All routes here are protected
router.use(protect);

// @route   GET /api/admin/courses
// @desc    Get all courses (including inactive)
// @access  Private
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json({ success: true, count: courses.length, data: courses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   POST /api/admin/courses
// @desc    Create new course
// @access  Private
router.post('/courses', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// @route   PUT /api/admin/courses/:id
// @desc    Update course
// @access  Private
router.put('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, data: course });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// @route   PUT /api/admin/courses/:id/price
// @desc    Update course price only
// @access  Private
router.put('/courses/:id/price', async (req, res) => {
    try {
        const { price, discountPrice, currency } = req.body;

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { price, discountPrice, currency },
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, data: course });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// @route   DELETE /api/admin/courses/:id
// @desc    Delete course
// @access  Private
router.delete('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
// @access  Private
router.get('/stats', async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({ isActive: true });
        const featuredCourses = await Course.countDocuments({ isFeatured: true });

        const categoryStats = await Course.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } }
        ]);

        res.json({
            success: true,
            data: {
                totalCourses,
                activeCourses,
                featuredCourses,
                categoryStats
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
