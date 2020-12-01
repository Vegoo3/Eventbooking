const QueryTypeDefs = require('./TypeDefs')

const { UserQuery } = require('../User')
const { EventQuery } = require('../Event')
const { BookingQuery } = require('../Booking')
const { AuthQuery } = require('../Auth')


const QueryResolvers = {
    Query: {
        ...UserQuery,
        ...EventQuery,
        ...BookingQuery,
        ...AuthQuery
    }
}

module.exports = {
    QueryTypeDefs,
    QueryResolvers
}