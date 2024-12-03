const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// Add a new blog page
router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});

// View a specific blog
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid blog ID.');
        }

        const findBlog = await Blog.findById(id);
        if (!findBlog) {
            return res.status(404).send('Blog not found.');
        }

        return res.render('blog', {
            user: req.user,
            blog: findBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error.');
    }
});

// Delete a blog
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid blog ID.');
        }

        // Find and delete the blog
        const deleteBlog = await Blog.findByIdAndDelete(id);
        if (!deleteBlog) {
            return res.status(404).send('Blog not found.');
        }

        // Fetch remaining blogs
        const allBlogs = await Blog.find({});

        return res.render('blogList', {
            user: req.user,
            blogs: allBlogs, // Correct variable name
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error.');
    }
});

// Add a new blog
router.post('/', upload.single('coverImage'), async (req, res) => {
    try {
        const { tittle, body } = req.body;

        // Create a new blog
        const newBlog = new Blog({
            body,
            tittle,
            createdBy: req.user._id,
            coverImage: `uploads/${req.file.filename}`,
        });

        await newBlog.save();

        console.log(newBlog);
        return res.redirect(`/blog/${newBlog._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Failed to create a new blog.');
    }
});

module.exports = router;
