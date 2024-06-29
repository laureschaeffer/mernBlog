import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
    //connect the db with string inside .env (private) file
    .connect(process.env.MANGO)
    .then(
        () => { console.log('MongoDb is connected');
    }).catch( err => {
        console.log(err);
    });


const app = express();

//allow Json as the input for the back
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);