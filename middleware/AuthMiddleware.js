import jwt from "jsonwebtoken"

export const auth=async(req,res,next)=>{
    try {
        const authHeaders=req.headers.authorization
        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(404).json({message:"Access token not exist"})
        }
        const token=authHeaders.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}