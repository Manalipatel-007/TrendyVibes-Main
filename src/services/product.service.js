const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

async function createProduct(reqData) {
    console.log("Received reqData:", reqData); // Log incoming request data for debugging

    // Correct the typo in the destructuring of reqData
    const { topLavelCategory, secondLavelCategory, thirdLavelCategory, ...otherFields } = reqData;
    const topLevelCategory = topLavelCategory; // Fix typo for consistent variable naming

    // Find or create top-level category
    let topLevel = await Category.findOne({ name: topLevelCategory }); // Search for existing category by name
    if (!topLevel) {
        topLevel = new Category({
            name: topLevelCategory,
            level: 1 // Define category level
        });
        console.log("Creating top-level category:", topLevel); // Log creation details
        await topLevel.save(); // Save new top-level category to the database
    }

    // Find or create second-level category
    let secondLevel = await Category.findOne({
        name: secondLavelCategory,
        parentCategory: topLevel._id, // Ensure parent-child hierarchy
    });
    if (!secondLevel) {
        secondLevel = new Category({
            name: secondLavelCategory,
            parentCategory: topLevel._id,
            level: 2 // Define category level
        });
        await secondLevel.save(); // Save second-level category
    }

    // Find or create third-level category
    let thirdLevel = await Category.findOne({
        name: thirdLavelCategory,
        parentCategory: secondLevel._id, // Ensure parent-child hierarchy
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: thirdLavelCategory,
            parentCategory: secondLevel._id,
            level: 3 // Define category level
        });
        await thirdLevel.save(); // Save third-level category
    }

    // Create and save product with third-level category reference
    const product = new Product({
        ...otherFields,
        category: thirdLevel._id, // Link to third-level category
    });
    await product.save(); // Save the product
    return { message: "Product created successfully" }; // Return success message
}

// Function to delete a product by its ID
async function deleteProduct(productId) {
    console.log("Deleting product with ID:", productId); // Add logging
    const deletedProduct = await Product.findByIdAndDelete(productId); // Search and delete product by ID
    if (!deletedProduct) {
        throw new Error("Product not found"); // Error if no product matches ID
    }
    return { message: "Product deleted successfully" }; // Return success message
}

// Function to update a product by its ID
async function updateProduct(productId, reqData) {
    console.log("Updating product with ID:", productId, "and data:", reqData); // Add logging
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true }); // Update product and return new version
    if (!updatedProduct) {
        throw new Error("Product not found"); // Error if no product matches ID
    }
    return { message: "Product updated successfully" }; // Return success message
}

// Function to find a product by its ID
async function findProductById(id) {
    console.log("Finding product with ID:", id); // Add logging
    try {
        const product = await Product.findById(id).populate("category").exec(); // Retrieve product and populate category details
        if (!product) {
            throw new Error("Product not found with id :", id); // Error if no product matches ID
        }
        return product; // Return product details
    } catch (error) {
        console.error("Error retrieving product:", error.message); // Add logging
        throw new Error(`Error retrieving product: ${error.message}`); // Handle and rethrow errors
    }
}

// Function to get all products with various filters and pagination
async function getAllProducts(queryParams) {
    console.log("Getting all products with queryParams:", queryParams); // Add logging
    let {
        category, color, sizes, minPrice, maxPrice, minDiscount, maxDiscount, sort, stock, pageNumber, pageSize
    } = queryParams || {}; // Provide default value for queryParams

    pageNumber = Math.max(pageNumber || 1, 1); // Ensure pageNumber is at least 1
    pageSize = pageSize || 10; // Default to 10 items per page

    console.log("Filters:", { category, color, sizes, minPrice, maxPrice, minDiscount, maxDiscount, sort, stock, pageNumber, pageSize }); // Log filters for debugging

    let query = Product.find().populate("category"); // Initialize query and populate category

    // Filter by category if provided
    if (category) {
        const existCategory = await Category.findOne({ name: category }); // Find category by name
        if (existCategory) {
            query = query.where("category").equals(existCategory._id); // Filter by category ID
        } else {
            console.log("Category not found:", category); // Log missing category
            return { content: [], currentPage: 1, totalPages: 0 }; // Return empty result
        }
    }

    // Filter by color if provided
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase())); // Normalize color input
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null; // Create regex for color matching
        if (colorRegex) {
            query = query.where("color").regex(colorRegex); // Apply regex filter
        }
    }

    // Filter by sizes if provided
    if (sizes) {
        const sizeSet = new Set(sizes.split(",").map(size => size.trim().toLowerCase())); // Normalize size input
        query = query.where("sizes.name").in([...sizeSet]); // Filter by size
    }

    // Filter by price range if provided
    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice); // Filter by price range
    }

    // Filter by discount range if provided
    if (minDiscount && maxDiscount) {
        query = query.where('discountPersent').gte(minDiscount).lte(maxDiscount); // Filter by discount range
    }

    // Filter by stock status if provided
    if (stock) {
        if (stock == "in_stock") {
            query = query.where('quantity').gt(0); // Filter for in-stock products
        } else if (stock == "out_of_stock") {
            query = query.where('quantity').lte(0); // Filter for out-of-stock products
        }
    }

    // Sort by price if sorting is requested
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1; // Determine sort direction
        query = query.sort({ discountedPrice: sortDirection }); // Apply sorting
    }

    const totalProducts = await Product.countDocuments(query); // Count total matching products
    const skip = (pageNumber - 1) * pageSize; // Calculate number of documents to skip for pagination
    query = query.skip(skip).limit(pageSize); // Apply pagination

    const products = await query.exec(); // Execute query
    const populatedProducts = await Product.populate(products, { path: 'category' }); // Ensure category details are populated

    const totalPages = Math.ceil(totalProducts / pageSize); // Calculate total number of pages

    console.log("Filtered products:", populatedProducts); // Log results for debugging
    return { content: populatedProducts, currentPage: pageNumber, totalPages: totalPages }; // Return paginated results
}

// Function to create multiple products
async function createMultipleProducts(products) {
    console.log("Creating multiple products with data:", products); // Add logging
    for (const product of products) {
        await createProduct(product); // Create each product
    }
    return { message: "Products created successfully" }; // Return success message
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProducts,
}