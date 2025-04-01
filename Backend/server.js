import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './route/userroute.js';
import productRouter from './route/productroute.js';


//App config
const app = express();
const port = process.env.PORT || 3000;

connectDB();
connectCloudinary();

//Middlewares

app.use(express.json());
app.use(cors());


//Api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send("working");
})

app.listen(port,()=>{
    console.log(`server is working on port: ${port}`);
});