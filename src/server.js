const app = require("."); // Import the Express app
const {connectDb} = require("./config/db"); // Import the database connection function

const PORT = 4000; // Define the port number
app.listen(PORT, async () => {
    await connectDb(); // Connect to the database
    console.log("ecommerce api listening on PORT:", PORT); // Log the server start message
});