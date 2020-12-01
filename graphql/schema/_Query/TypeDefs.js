module.exports = `
type Query {
    user(email:String!): User
    users: [User]
    events: [Event]
    bookings: [Booking]
    login(email: String!, password: String!): AuthData!
}
`