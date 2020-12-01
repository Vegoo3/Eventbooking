const bcrypt = require('bcryptjs')
const pool = require('@db')
const uuid = require('uuid')
const UserTypeDefs = require('./TypeDefs')
const validation = require("@validation")

const UserQuery = {
    user: async (_,args) => {
        console.log('sada')
        const resolvers = await pool.query('SELECT id, email FROM "user" where email = $1', [args.email])
        if(!resolvers.rows[0])
        {
            throw new Error("404 email not found")
        }
        return resolvers.rows[0]
    },
    users: async (_, args) => {
        const resolvers = await pool.query('SELECT * FROM admin ORDER BY email ASC')
        return resolvers.rows
    }
}

const UserMutation = {
    createUser: async (parent, {email, password}) => {
        validation({ email }, [["email", "email", { require: true }]]);
        validation({ password }, [["password", "password", { require: true }]]) // 8znaków(min. 1cyfra 1wielka bez znaków specjalnych)
        const checkEmail = await pool.query('SELECT email FROM "user" where email = $1',[email])
        if(!checkEmail.rows[0]) {
            return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
            const user = {
                id: uuid(),
                email: email,
                password: hashedPassword
            }
            pool.query('INSERT INTO "user"(email, id, password) VALUES ($1, $2, $3)',[user.email,user.id,hashedPassword])
            return user
        })
        } else {
            return new Error('email existing')
        } 
    },
}

const UserResolvers = {
    User: {
        createdEvents: async (parents, args) => {
            const resolvers = await pool.query("SELECT * from events")
            return resolvers.rows.filter(x => x.creator === parents.id)
        }
    }
}

module.exports = {
    UserTypeDefs,
    UserQuery,
    UserMutation,
    UserResolvers
}