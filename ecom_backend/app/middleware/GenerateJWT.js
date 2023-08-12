const jwt = require('jsonwebtoken')

const GenerateJWT = function()
{
    // this.id = userDetail.id
    // this.email = userDetail.email
    // this.name = userDetail.name
}

GenerateJWT.genToken = (id, email, name, result) => {
    // console.log(name)
    jwt.sign({id, name, email}, "34534", {expiresIn:'10s'}, (err, token) => {

        result(null, token)
    })
}

module.exports = GenerateJWT