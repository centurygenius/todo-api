const express = require ('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // Import MongoDB connection
//const router = require('./routes');
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const cleanupBlacklistedTokens = require("./utils/cleanupBlacklistedTokens");

const PORT = process.env.PORT || 3500;

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/users", userRoutes)
app.use("/api/todos", todoRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!!!!!!!');
});

// Run cleanup every 1 hour to prevent database bloat
setInterval(cleanupBlacklistedTokens, 60 * 60 * 1000);

// Connect to MongoDB and start server
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log('Database connected successfully');
        console.log(`Todo app listening at http://localhost:${PORT}`);
    })
}).catch(error => 
    console.log("Database connection was not successful", error)
)

