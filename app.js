const express = require('express')
// const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.get('/', (req,res) =>{
  res.send("hello from node updated")
})

const port = process.env.PORT || 8000

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)
})