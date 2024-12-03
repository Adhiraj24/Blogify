const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { createToken } = require("../services/authService");

const handleSignup = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
        return res.status(400).json({ success: false, message: "All fields are required" });

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist){
        return res.status(400).json({ success: false, message: "User Already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashPassword,
    });

    const token = createToken(user);

    res.cookie("token", token)

    await user.save();

    console.log("User Created Successfully");

    return res.redirect('/');
};


const handleSignin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('signin', { errorMessage: "All fields are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('signin', { errorMessage: "Invalid User" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('signin', { errorMessage: "Invalid credentials" });
        }

        const token = createToken(user);

        return res.cookie("token", token).redirect('/');
        
    } catch (error) {
        return res.render('signin', { errorMessage: `Error encountered: ${error.message}` });
    }
};


const handleUserCount = async (req,res) => {
    const user = await User.find({});

    const availableUser = user.map((users) => {
        return users.fullName
    })

    res.send(availableUser)
}


module.exports = { handleSignup,handleSignin,handleUserCount };
