const Category = require("../models/category.model.js");
const Product = require("../models/product.model");

async function createProduct(reqData){
    // Find or create top-level category
    let topLevel = await Category.findOne({name : reqData.topLevelCategory}); // findOne method to find a single document

    if(!topLevel){
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
    }

    // Find or create second-level category
    let secondLevel = await Category.findOne({
        name : reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });

    if(!secondLevel){
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
    }

    // Find or create third-level category
    let thirdLevel = await Category.findOne({
        name : reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });

    if(!thirdLevel){
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3,
        });
    }

    // Create new product with the third-level category
    const product = new Product({
        title : reqData.title, // Product title
        color: reqData.color, // Product color
        description: reqData.description, // Product description
        discountedPrice: reqData.discountedPrice, // Discounted price
        discountPercent: reqData.discountPercent, // Discount percentage
        imageUrl: reqData.imageUrl, // Image URL
        brand : reqData.brand, // Brand name
        price: reqData.price, // Original price
        sizes: reqData.size, // Available sizes
        quantity: reqData.quantity, // Quantity in stock
        category: thirdLevel._id, // Category ID
    });

    // Save the product to the database
    return await product.save(); // save method to save the document
}

// Function to delete a product by its ID
async function deleteProduct(productId){
    const product = await findProductById(productId); // Find the product by ID

    await Product.findByIdAndDelete(productId); // findByIdAndDelete method to delete a document by its ID
    return "Product deleted successfully"; // Return success message
}

// Function to update a product by its ID
async function updateProduct(productId, reqData){
    return await Product.findByIdAndUpdate(productId, reqData); // findByIdAndUpdate method to update a document by its ID
}

// Function to find a product by its ID
async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec(); // findById method to find a document by its ID, populate method to replace the specified path with actual documents, exec method to execute the query

    if(!product){
        throw new Error("product not found with id :", id); // Throw error if product not found
    }
    return product; // Return the found product
}

// Function to get all products with various filters and pagination
async function getAllProducts(){
    let {category, color, sizes, minPrice, maxPrice, minDiscount, maxDiscount, sort, stock, pageNumber, pageSize} = req.query;

    pageSize = pageSize || 10; // Default page size

    let query = Product.find().populate("category"); // Initialize query and populate category

    // Filter by category
    if(category){
        const existCategory = await Category.findOne({name : category}); // findOne method to find a single document
        if(existCategory){
            query = query.where("category").equals(existCategory._id); // where method to add a condition to the query, equals method to specify the value
        } else {
            return {content: [], currentPage: 1, totalPages: 0};
        }
    }

    // Filter by color
    if(color){
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex); // regex method to add a regular expression condition to the query
    }

    // Filter by sizes
    if(sizes){
        const sizeSet = new Set(sizes);
        query = query.where("sizes.name").in([...sizeSet]); // in method to specify an array of values
    }

    // Filter by price range
    if(minPrice && maxPrice){
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice); // gte method to specify a greater than or equal condition, lte method to specify a less than or equal condition
    }

    // Filter by discount range
    if(minDiscount && maxDiscount){
        query = query.where('discountPercent').gte(minDiscount).lte(maxDiscount);
    }

    // Filter by stock status
    if(stock){
        if(stock == "in_stock"){
            query = query.where('quantity').gt(0); // gt method to specify a greater than condition
        } else if(stock == "out_of_stock"){
            query = query.where('quantity').lte(0); // lte method to specify a less than or equal condition
        }
    }

    // Sort by price
    if(sort){
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({discountedPrice: sortDirection}); // sort method to sort the results
    }

    const totalProducts = await Product.countDocuments(query); // countDocuments method to count the number of documents that match the query

    const skip = (pageNumber - 1) * pageSize; // Calculate skip value for pagination

    query = query.skip(skip).limit(pageSize); // skip method to specify the number of documents to skip, limit method to specify the maximum number of documents to return

    const products = await query.exec(); // Execute the query

    const totalPages = Math.ceil(totalProducts / pageSize); // Calculate total pages

    return {content: products, currentPage: pageNumber, totalPages: totalPages}; // Return paginated products
}

// Function to create multiple products
async function createMultipleProducts(products){
    for(let product of products){
        await createProduct(product); // Create each product
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProducts,
}
