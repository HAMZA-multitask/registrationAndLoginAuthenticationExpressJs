import express from 'express'
import connectDB from './db/connectdb.js'
import web from './routes/web.js'

const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

// Database Connection
connectDB(DATABASE_URL)

// Set Template Engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

// Load Routes
app.use('/', web)


app.listen(port, () =>{
    console.log(`Server listening at http://localhost:${port}`)
})