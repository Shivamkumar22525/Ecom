import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './route/userroute.js';
import productRouter from './route/productroute.js';
import cartRouter from './route/cartRoute.js';
import orderRouter from './route/orderRoute.js';

const app = express();
const port = 3000;

connectDB();
connectCloudinary();

// ✅ CORS first!
const allowedOrigins = [
  "https://vampclothing.vercel.app",
  "https://vampclothing-admin.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("working");
});

app.listen(port, () => {
  console.log(`server is working on port: ${port}`);
});
