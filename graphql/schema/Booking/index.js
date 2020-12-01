const pool = require('@db')
const BookingTypeDefs = require('./TypeDefs')
const uuid = require('uuid')

const BookingMutation = {
    bookEvent: async (_,args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        const booking = {
            id: uuid(),
            user: req.userId,
            event: args.eventId
        }
        //pool.query('INSERT INTO booking(id, event, "user") VALUES ($1, $2, $3)',[booking.id, booking.event, booking.user])
        return booking
    },
    cancelBooking: async (parent,args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        try{
            const results = await pool.query("SELECT * FROM booking")
            //pool.query('DELETE FROM booking where id = $1',[args.bookingId])
            return results.rows.find(x => x.id === args.bookingId)
        } catch (err) {
            throw err
        }
    }
}

const BookingQuery = {
    bookings: async (_,args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        try {
            const resolvers = await pool.query('SELECT * FROM booking')
            return resolvers.rows.filter(x => x.user === req.userId)
        } catch (err) {
            throw err;
        }
    },
}

const BookingResolvers = {
    Booking: {
        event: async (parent) => {
            const resolvers = await pool.query('SELECT * FROM events')
            return resolvers.rows.find(x => x.id === parent.event)
        },
        user: async (parent) => { 
            const resolvers = await pool.query('SELECT id, email FROM "user"')
            return resolvers.rows.find(x => x.id === parent.user)
        },
    }
}

module.exports = {
    BookingMutation,
    BookingQuery, 
    BookingResolvers,
    BookingTypeDefs
}