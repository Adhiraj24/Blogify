const mongoose = require('mongoose'); // Import mongoose

const blogSchema = new mongoose.Schema(
    {
        tittle: { // Correcting typo from `tittle` to `title`
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: false, // Optional field
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // Correctly reference ObjectId
            ref: "User", // Reference the User collection
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Blog = mongoose.model('Blog', blogSchema); // Use PascalCase for the model name

module.exports = Blog; // Export the model
