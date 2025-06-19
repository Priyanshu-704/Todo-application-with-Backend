require("dotenv").config();
const express = require('express');
const connectDb = require('./config/db');
const auth = require('./routes/authRoutes');
const list = require('./routes/listRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

connectDb()


const PORT = process.env.PORT || 5000;



app.use("/api/v1", auth)
app.use("/api/v2", list)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})