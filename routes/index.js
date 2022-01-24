const express = require('express');
const {requireAuth} = require('../middleware/authMiddleware')


const router = express.Router();

router.get('/', requireAuth, (req,res) => {
    res.render("dashboard")
})

router.get('/logout', (req,res) => {
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/users/login');
})

module.exports = router