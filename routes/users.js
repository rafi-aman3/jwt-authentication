const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/user')


const router = express.Router();


const createToken = (id) => {
    return jwt.sign({ id }, 'boomShakaLaka', {
        expiresIn: "5m"
    })

}


router.get('/login', (req,res) => {
    res.render('login')
})

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/api/register', async (req,res) => {
    const {username, email,password: plainTextPassword} = req.body;

    if(!username || typeof username !== 'string') {
        return res.json({status: "error" , error: "Invalid Username" })

    }

    if(!email || typeof email !== 'string') {
        return res.json({status: "error" , error: "Invalid Email" })
        
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: "error" , message: "Invalid Password" })
        
    }

    if(plainTextPassword.length < 8) {
        return res.json({status: "error", message: "Password must be 8 Characters or more"})
    }

    const password = await bcrypt.hash(plainTextPassword,10);
    console.log(password);

    try {
        const response = await User.create({
            username,email,password
        })
        console.log(response)

        
    } catch (error) {
        if(error.code === 11000) {
            return res.json({status: "error", message: "username already taken"})
        }
        
    }
    res.json({status: "success", message: "You are registered successfully"})


})

router.post('/api/login', async (req,res) => {
    const {username,password} = req.body;

    const user = await User.findOne({
        username
    }).lean();

    if(!user) {
        return res.json({status: "error", message: "Invalid Username/Password"})
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 60000})
        return res.json({status: 'success', message: "Logged In Successfully"})
    }

    res.json({status: "error", message: "Invalid Username/Password"})
})

module.exports = router