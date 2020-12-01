const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')
require('module-alias/register');
require('dotenv').config({
    
})


const isAuth = require('./middleware/is-auth')




const app = express()
app.use(isAuth)
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
})

const schema = require('./graphql/schema')

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        return {
            isAuth: req.isAuth,
            userId: req.userId
        }
    },

})

server.applyMiddleware({ app })

if(process.env.NODE_ENV !== "test") {
    app.listen(8000,()=>{
        console.log('8k')
    })
}

module.exports = {
    app,
    server
}