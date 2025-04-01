import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message: "Not Authorized!!!  Re-login"});
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.json({sucess:false, message: "Not Authorized!!!  Re-login"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}

export default adminAuth