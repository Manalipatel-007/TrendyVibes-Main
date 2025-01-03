const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.route'); // Add this line
const userRoutes = require('./routes/userRoutes');

// ...existing code...

app.use(express.json());
app.use('/api', productRoutes); // Register product routes with the '/api' prefix
app.use('/auth', authRoutes); // Register auth routes with the '/auth' prefix
app.use('/api/users', userRoutes);

// ...existing code...

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`ecommerce api listening on PORT: ${PORT}`);
});