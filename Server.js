import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import reservaRouter from './Routes/AppRoutes.js'


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI)

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.use(express.json())


app.use('/api', reservaRouter)


app.listen(PORT, () => {
    console.log(`Servidor en ejecuccion en http://localhost:${PORT}`)
})