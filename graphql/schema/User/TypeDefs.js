module.exports = `
type User {
    id: String!
    email: String!
    password: String
    createdEvents: [Event!]
}
`