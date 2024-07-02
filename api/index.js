import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

//connect the db with string inside .env (private) file
mongoose
    .connect(process.env.MONGO)
    .then(
        () => { console.log("MongoDb is connected");
    }).catch( err => {
        console.log(err);
    });


const app = express();

//allow Json as the input for the back
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//middleware that gives error messages
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message  = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
