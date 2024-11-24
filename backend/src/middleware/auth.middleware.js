const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if (!token){
            return res.status(401).json({msg : "Unauthorized Entery Token not Provided !"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if (!decode) {
            return res.status(403).json({ msg: "Access Denied. Invalid Token!" });
        }
        
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
      
        req.user = user;
      
      
        next();
     } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {protectRoute};