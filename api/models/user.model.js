import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    }, {timestamps: true} //save date creation and updates
);

const User = mongoose.model('User', userSchema); //create the model

export default User;