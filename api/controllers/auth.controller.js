import User from '../models/user.model.js';

//async since the response will take time, we need to wait and then resend it
export const signup = async (req, res) => {
    const { username, email, password } = req.body

    //prevent errors or empty field
    if(!username || !email || !password || username === '' || email ==='' || password === ''){
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new  User({
        //only writting username equals to username: username when both are the same string
        username: username,
        email: email,
        password: password
    });

    //save the new User inside  db
    await newUser.save();

    //create a response
    res.json( 'Signup successful');
}


// export const signup = async (req, res) => {
//     console.log(req.body)
// }