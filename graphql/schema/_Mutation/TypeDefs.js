module.exports = `
type Mutation {
    createEvents(title: String!, description: String!, price: Float!, date: String!): Event
    createUser(email: String!, password: String!): User
    bookEvent(eventId: String!): Booking!
    cancelBooking(bookingId: String!) : Booking!
}
`