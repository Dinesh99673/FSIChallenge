import express from 'express';
import authenticate from '../Middleware/authenticate.js';
import authorizeRole from '../Middleware/authorizeRole.js';
import { signup, login, resetOldPassword} from '../Controller/authController.js';

const router = express.Router();

// User signup route
router.post('/signup', signup);

// User login route
router.post('/login', login);

//Reeset Password
router.post('/reset-password',authenticate, authorizeRole('admin', 'owner'), resetOldPassword)

export default router;
