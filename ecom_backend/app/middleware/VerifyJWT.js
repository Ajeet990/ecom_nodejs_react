const jwt = require('jsonwebtoken')
const User = require("../models/user.model.js");


const {JWT_SECRET} = require('../../env')
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
        return res.status(401).json({ error: "token not found" });
    }
    const token = authorization.replace("Bearer ", "");
    // console.log(token)
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: error });
        }
        User.findUserById(payload.id, (error, data) => {
            if (error) {
                return res.status(500).json({error:error})
            } else {
                if(data.length > 0) {
                    next();
                } else {
                    return res.status(404).json({error:"user not found"})
                }
            }
            
        })
    })
}