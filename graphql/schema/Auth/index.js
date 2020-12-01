const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('@db')
const AuthTypeDefs = require('./TypeDefs')


const AuthQuery = {
    login: async (_,args) => {
        const user = await pool.query('SELECT * FROM "user" WHERE email = $1',[args.email])
        if(!user.rows[0]) {
            throw new Error('User does not exist!')
        }
        const isEqual = await bcrypt.compare(args.password, user.rows[0].password)

        if(!isEqual) {
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({userId: user.rows[0].id, email: user.rows[0].email}, 'secret', {expiresIn: '10h'})
        return { userId: user.rows[0].id, token: token, tokenExpiration: 1}
    }
}

const AuthResolvers = {

}

const AuthMutation = {

}

module.exports = {
    AuthTypeDefs,
    AuthQuery,
    AuthResolvers,
    AuthMutation
}