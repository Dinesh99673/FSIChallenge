import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, getUserById,  resetPassword } from '../Database/Queries/userQueries.js';

// Handle user signup - create new user account
export const signup = async (req, res) => {
    try{
        const { role, name, email, addr, password } = req.body;

        // Check if user with given email already exists
        const existing = await getUserByEmail(email);

        if (existing){
            return res.status(409).json({ msg: 'user with the email exist' });
        }
        // Hash password 
        const hashed_password = await bcrypt.hash(password, 10);

        // Insert new user into database
        const { msg, code } = await createUser({role, name, email, addr, hashed_password});

        // Send response with success or failure message
        return res.status(code).json({ msg });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:error})
    }
};

// Handle user login - authenticate and return JWT token
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Get user details by email
        const user = await getUserByEmail(email);

        // If user not found, send error
        if (!user) return res.status(401).json({ msg: 'Invalid email' });

        // Compare hashed password in DB with hash of entered password
        const match = await bcrypt.compare(password, user.hashed_password);

        // If password mismatch, send error
        if (!match) return res.status(401).json({ msg: 'Invalid password' });

        // Generate JWT token with user id payload
        const token = jwt.sign({ userId: user.id, time:new Date(), role: user.role }, process.env.JWT_SECRET_KEY);

        // Send token in response
        return res.status(200).json({ token });
    }catch(error){
        console.log(error);
        
        return res.status(500).json({message:"Hey see thi"})
    }
};

export const resetOldPassword = async (req,res) =>{
    try{
        const {oldPassword, newPassword} = req.body
        const {userId} = req.user

        const user = await getUserById(userId);
        const match = await bcrypt.compare(oldPassword, user.hashed_password);
        if(!match){
            return res.status(400).json({message:"wrong current password. Please try again"})
        }

        // Hash password 
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const {code, msg} = await resetPassword({userId, hashedNewPassword});

        // Send response with success or failure message
        return res.status(code).json({ msg });
        

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"})        
    }
}
