import express from 'express'
import cors from 'cors'
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

// Route handling
app.use('/auth', authRouter);      // Signup & login
app.use('/user', userRouter)

export default app;