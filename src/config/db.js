const mongoose  = require("mongoose")

const mondbUrl = "mongodb+srv://manaliverma123:8XwK1eMXO6o4jy6Y@cluster0.qicqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}