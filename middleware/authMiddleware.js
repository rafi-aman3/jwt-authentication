const jwt = require('jsonwebtoken');



const requireAuth = (req,res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'boomShakaLaka', (error, decodedToken) => {
            if(error) {
                console.log(error)
                res.redirect('/users/login')

            } else {
                console.log(decodedToken);
                next();

            }

        })
    } else {
        res.redirect('/users/login')
    }

}

module.exports = {requireAuth}