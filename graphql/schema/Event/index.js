const pool = require('@db')
const EventTypeDefs = require('./TypeDefs')
const uuid = require('uuid')

const EventQuery = {
    events: async () => {
        const resolvers = await pool.query('SELECT * FROM events')
        return resolvers.rows
    },
}

const EventResolvers = {
    Event: {
        creator: async (parent) => {
            const resolvers = await pool.query('SELECT id, email FROM "user"')
            return resolvers.rows.find(user => user.id === parent.creator)
        }
    },
}

const EventMutation = {
    createEvents: async (_,args,req) => { 
        if(!req.isAuth) {
           throw new Error('Unauthenticated!')
        }
        const event = {
            id: uuid(),
            title: args.title,
            description: args.description,
            price: args.price,
            date: args.date,
            creator:req.userId 
        }
        //pool.query('INSERT INTO events(id, title, description, price, date, creator) VALUES ($1, $2, $3, $4, $5, $6)',[event.id,event.title,event.description,event.price,event.date, event.creator])
        return event
    },
}

module.exports = {
    EventTypeDefs,
    EventResolvers,
    EventQuery,
    EventMutation
}