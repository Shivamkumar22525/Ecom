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
const port = process.env.PORT || 3000;

// ✅ Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Define allowed origins
const allowedOrigins = [
  "https://vampclothing.vercel.app",
  "https://vampclothing-admin.vercel.app"
];

// ✅ Use cors middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Body parser middleware
app.use(express.json());

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send("Backend is working ✔️");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});
