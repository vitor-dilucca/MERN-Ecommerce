const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
require('dotenv').config()
//import routes
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/User.js")

// app
const app = express()

// db
mongoose
  .connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
    })
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})