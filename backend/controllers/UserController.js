const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const { default: mongoose } = require("mongoose");
const {default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// generate user token

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
};

// register user and sign in

const register = async (req, res) => {

    const { name, email, password } = req.body

    // check if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({error: ["Por favor, utilize outro e-mail"]})
    }

    // generate password
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // if user was created successfully, return the token
    if (!newUser) {
        res.status(422).json({error: ["Houve um erro, Por favor tente mais tarde"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })


};

const login = async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if (!user) {
        res.status(404).json({ error: ["Usuário não encontrado"]})
        return
    }

    // chack if password matches
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({error: ["Senha invalida"] })
        return
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })
}

// get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

// Update an user
const update = async (req, res) => {
    const {name, password, bio} = req.body

    let profileImage = null

    if (req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user;

    const user = await User.findById( new mongoose.Types.ObjectId(reqUser._id)).select("-password");

    if (name) {
        user.name = name;
    }

    if (password) {
        // generate password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio
    }

    await user.save()

    res.status(200).json(user)
}

// Get user by ID

const getUserById = async(req, res) => {

    const {id} = req.params;
 
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");

    // check if user eists
    if (!user) {
        res.status(404).json({error:["Usuário não encontrado."]});
        return;
    }
    

    res.status(200).json(user);

}


module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
}