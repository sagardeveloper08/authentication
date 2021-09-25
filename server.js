const express = require('express');
const app = express();
const userRoutes = require('./routes/routes')
// const auth = require('./routes/routes')
app.use(express.json());

require("dotenv/config");

require('./config/config')

app.use("/", userRoutes)
// app.use("/auth", auth);

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})
