const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure name is required
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    level: {
        type: Number,
        required: true,
    },
});

categorySchema.pre('save', function(next) {
    console.log("Saving category:", this); // Add logging
    next();
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;

