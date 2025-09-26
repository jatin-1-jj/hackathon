const Alumni = require("../models/Alumni");
const jwt = require('jsonwebtoken')



const fetchAlumni = async(req,res)=>{
    try {
        const token = req.cookies.jwtToken;
        if(!token){
            return res.status(404).json({
                success:false,
                message:"token is not there in alumni controller"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const currAlumni_id = decoded.userId;

        const allAlumni = await Alumni.find({
            _id:{$ne:currAlumni_id}
        }).select("-password")
        if(allAlumni.length===0){
            return res.status(200).json({
                success:false,
                message:"no alumni found or error in fetching in alumni controller",
            });
        }
        
        return res.status(201).json({
            success:true,
            alumni:allAlumni,
            message:"here is your Alumni list"
        }
        );
    } catch (error) {
        console.log('error in fetchAlumni controller ',error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }


}


module.exports={fetchAlumni}