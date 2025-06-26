import { getUserRatings, updateRating } from "../Database/Queries/storeQueries.js";

//Handle ratings given by user
export const userRating = async (req,res) =>{
    const data = await getUserRatings(req.user.userId);
    return res.status(200).json({message:"Done bro", data})
}

export const updateUserRating = async (req, res) =>{
    try{
        const {code, message} = await updateRating(req.body.store_id, req.user.userId, req.body.newRating)
        return res.status(code).json({message})
    }catch(error){
        console.log(error);
        
    }
}