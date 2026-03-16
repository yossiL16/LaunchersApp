
export function validationOfBody(req,res,next){
     const {name, rocketType, latitude, longitude, city} = req.body;
     if (!name || !rocketType || !latitude || !longitude || !city){
        return res.status(400).json({error: "One or more fields are missing."})
     } 
     if(typeof name !== "string" || typeof rocketType !== 'string' || 
        typeof latitude !== "number" || typeof longitude !== "number" ||
        typeof city !== 'string'
     ){ return res.status(400).json({error: "Type problem"})}
     next()
}