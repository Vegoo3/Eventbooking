const { createTestClient } = require('apollo-server-testing')
const { app, server } = require('@app')
const { query, mutate } = createTestClient(server)
const gql = require('graphql-tag')


describe("User", () => {
    
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: false
            }
        };
    });

    it("Get user", async done => {
        const GET_USER = gql `
        query($email: String!){
            user(email: $email){
                id
                email
                password
                createdEvents{
                    title
                }
            }
        }
    `;

        const result = await query({
            query: GET_USER,
            variables: {
                "email": "test@test.com"
            }
        })


        expect(result.data.user).toBeTruthy()
        const data = result.data.user
        expect(data.id).toEqual("fb87ebd6-1373-4bf4-9277-153733ceb57f")
        expect(data.email).toEqual("test@test.com")
        expect(data.password).toBeNull()
        expect(data.createdEvents).toBeTruthy()
        done()
    })

    it("Get users", async done => {
        const GET_USERS = gql `
        query{
            users{
                id
                email
                password
                createdEvents{
                    title
                }
            }
        }
    `;

        const result = await query({
            query: GET_USERS,
            variables: {}
        })


        expect(result.data.users).toBeTruthy()

        done()
    })

    it("Get incorrect user", async done => {
        const GET_USER = gql `
        query($email: String!){
            user(email: $email){
                id
                email
                createdEvents{
                    title
                }
            }
        }
    `;

        const result = await query({
            query: GET_USER,
            variables: {
                "email": "hdhgfhfdfgh@test.com"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("404 email not found")
        done()
    })

    it("Create new user(correct email and password)", async done => {
        const CREATE_USER = gql `
            mutation CREATE_USER($email: String!, $password: String!){
                createUser(email: $email, password: $password){
                    id
                    email
                    createdEvents{
                        title
                    }
                }
            }
        `;

        const result = await mutate({
            query: CREATE_USER,
            variables: {
                "email": "XDDDD@XD.com",
                "password": "qwer2yuI"
            }
        })


        expect(result.data.createUser).toBeTruthy();
        const data = result.data.createUser;
        expect(data.id).toBeTruthy()
        expect(data.email).toEqual("XDDDD@XD.com")
        expect(data.createdEvents).toBeTruthy()

        done()
    })
/////////////////
    it("Create new user(email existing)", async done => {
        const CREATE_USER = gql `
            mutation CREATE_USER($email: String!, $password: String!){
                createUser(email: $email, password: $password){
                    id
                    email
                    createdEvents{
                        title
                    }
                }
            }
        `;

        const result = await mutate({
            query: CREATE_USER,
            variables: {
                email: "test@test.com",
                password: "qwer2yuI"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual('email existing')
        done()
    })

    it("Create new user(bad email)", async done => {
        const CREATE_USER = gql `
            mutation CREATE_USER($email: String!, $password: String!){
                createUser(email: $email, password: $password){
                    id
                    email
                    createdEvents{
                        title
                    }
                }
            }
        `;

        const result = await mutate({
            query: CREATE_USER,
            variables: {
                email: "123",
                password: "123"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual('Niepoprawne dane formularza')
        done()
    })

    it("Create new user(bad password)", async done => {
        const CREATE_USER = gql `
            mutation CREATE_USER($email: String!, $password: String!){
                createUser(email: $email, password: $password){
                    id
                    email
                    createdEvents{
                        title
                    }
                }
            }
        `;

        const result = await mutate({
            query: CREATE_USER,
            variables: {
                email: "tesst@test.pl",
                password: "123"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual('Niepoprawne dane formularza')
        done()
    })
})