
export function validationOfBody(req,res,next){
     const {name, rocketType, latitude, longitude, city} = req.body;
     if (!name || !rocketType || !latitude || !longitude || !city){
        return res.status(400).json({error: "One or more fields are missing."})
     } 
     next()
}