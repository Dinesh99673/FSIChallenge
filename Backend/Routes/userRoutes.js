import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import authorizeRole from '../Middleware/authorizeRole.js';
import { userRating, updateUserRating } from '../Controller/userController.js';
const router = express.Router();


//Reeset Password
router.get('/user-ratings',authenticate, authorizeRole('user'), userRating)

//Update Ratings
router.post('/update-rating',authenticate, authorizeRole('user'), updateUserRating)

export default router;
