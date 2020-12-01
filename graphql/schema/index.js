const { gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// tutaj wyszystkie TypeDefs i resolvers
const { QueryTypeDefs, QueryResolvers } = require('./_Query')
const { MutationTypeDefs, MutationResolvers } = require('./_Mutation')
const { EventTypeDefs, EventResolvers } = require('./Event')
const { BookingTypeDefs, BookingResolvers } = require('./Booking')
const { AuthTypeDefs, AuthResolvers } = require('./Auth')
const { UserTypeDefs, UserResolvers } = require('./User')

const schema = makeExecutableSchema({
    typeDefs: [
        QueryTypeDefs,
        MutationTypeDefs,
        EventTypeDefs,
        BookingTypeDefs,
        AuthTypeDefs,
        UserTypeDefs
    ],
    resolvers: {
        ...QueryResolvers,
        ...MutationResolvers,
        ...EventResolvers,
        ...BookingResolvers,
        ...AuthResolvers,
        ...UserResolvers
    }
})

module.exports = schema