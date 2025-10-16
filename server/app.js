import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'


import userRoutes from './routes/userRoutes.js'
import ItemRoutes from './routes/ItemRoutes.js'


const app = express()
dotenv.config();
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    )
    next()
})
// app.use('/', (req, res) => {
//     res.send('API is running....')
// })

app.use('/users', userRoutes)

app.use('/Items', ItemRoutes)


const port = 4000;
const db = process.env.MONGO_URI;

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(port,() => console.log(db+":"+'Connection done and running on PORT :'+ port))).catch((err) => console.log(err.message));

