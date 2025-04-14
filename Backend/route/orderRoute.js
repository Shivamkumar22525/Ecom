import express from 'express'
import { placeOrders, placeOrdersRazopay, placeOrdersStripe, allOrders, updateStatus, userOrders, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/userAuth.js';

const orderRouter = express.Router();

// admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// payment features
orderRouter.post('/place',authUser,placeOrders);
orderRouter.post('/stripe',authUser,placeOrdersStripe);
orderRouter.post('/razorpay',authUser,placeOrdersRazopay);

// verify stripe payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

// verify razorpay payment
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

// user feature
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter