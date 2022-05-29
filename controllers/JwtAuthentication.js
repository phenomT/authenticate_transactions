const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const users = [];



module.exports.createUser = async (req,res) => {

    if (req.body == null) {
        return response.status(422).json({
            "message": "Invalid data supplied as input."
        });
    }
    const username = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push ({"name": username, "password": hashedPassword})
    User.create({...users[0]}).then((data) => {
        return res.status(201).json(data);
    }).catch((error) => {
        console.log(error);
    })

};



//const { response } = require("../app");

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
module.exports.loginUser = async (req,res) => {
    User.findOne({
        where: {
            "name":req.body.name,
        }
    }).then((user)=> {
        //check to see if the user exists in the list of registered users
        if (user == null) return res.status(404).json({
            "message": "User does not exist."
        });
        //if user does not exist, send a 400 response
        if ( bcrypt.compare(req.body.password, user.password)) {
            console.log(user.name);
            const accessToken = generateAccessToken ({user: user.name})
            const refreshToken = generateRefreshToken ({user: user.name})
            user.token = accessToken;
            return res.status(200).json ({accessToken: accessToken, refreshToken: refreshToken})

        } 
        else {
            return res.status(401).json({
                "message":"Password Incorrect!"
            });
        }
    });
}

module.exports.validate = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    console.log(user);
    if (user != null) {
        User.findOne({
            where: {
                "name" : user.user
            }
        }).then((dUser)=> {
            if (dUser != null) {
                next();
            } else {
                return res.status(401).json({
                    "message" : "User Authentication Failed"
                });
            }
           
        }).catch((error) => {
            console.log(error);
        });
    } else {
        return res.status(403).json({
            "message" : "Invalid Token"
        })
    }
}


// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 360}) 
}



// refreshTokens
let refreshTokens = []
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 360})
    refreshTokens.push(refreshToken)
    return refreshToken
}

//REFRESH TOKEN API
module.exports.refreshToken = (req,res) => {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
    refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
    const accessToken = generateAccessToken ({user: req.body.name})
    const refreshToken = generateRefreshToken ({user: req.body.name})
    res.json ({accessToken: accessToken, refreshToken: refreshToken})
}


module.exports.logoutUser = (req,res)=>{
    refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
    //remove the old refreshToken from the refreshTokens list
    res.status(204).send("Logged out!")
}