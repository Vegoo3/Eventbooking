const MutationTypeDefs = require('./TypeDefs')
const { UserMutation } = require('../User')
const { EventMutation } = require('../Event')
const { BookingMutation } = require('../Booking')
const { AuthMutation } = require('../Auth')

const MutationResolvers = {
    Mutation: {
        ...UserMutation,
        ...EventMutation,
        ...BookingMutation,
        ...AuthMutation
    }
}

module.exports = {
    MutationResolvers,
    MutationTypeDefs
}