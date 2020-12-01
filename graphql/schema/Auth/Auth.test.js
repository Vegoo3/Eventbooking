const { createTestClient } = require('apollo-server-testing')
const { app, server } = require('@app')
const { query, mutate } = createTestClient(server)
const gql = require('graphql-tag')


describe("Auth", () => {
    
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: false
            }
        };
    });

    it("login with incorrect email", async done => {
        const LOGIN = gql `
        query($email: String!, $password: String!){
            login(email: $email, password: $password){
                userId
                token
                tokenExpiration
            }
        }
    `;

        const result = await query({
            query: LOGIN,
            variables: {
                "email": "nieMaTakiegoMaila@test.com",
                "password": "test"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("User does not exist!")
        done()
    })

    it("login with incorrect password", async done => {
        const LOGIN = gql `
        query($email: String!, $password: String!){
            login(email: $email, password: $password){
                userId
                token
                tokenExpiration
            }
        }
    `;

        const result = await query({
            query: LOGIN,
            variables: {
                "email": "test@test.com",
                "password": "nieMatakiegoHasla"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("Password is incorrect")
        done()
    })

    it("login with incorrect email", async done => {
        const LOGIN = gql `
        query($email: String!, $password: String!){
            login(email: $email, password: $password){
                userId
                token
                tokenExpiration
            }
        }
    `;

        const result = await query({
            query: LOGIN,
            variables: {
                "email": "nieMaTakiegoMaila@test.com",
                "password": "test"
            }
        })


        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("User does not exist!")
        done()
    })

    it("correct login", async done => {
        const LOGIN = gql `
        query($email: String!, $password: String!){
            login(email: $email, password: $password){
                userId
                token
                tokenExpiration
            }
        }
    `;

        const result = await query({
            query: LOGIN,
            variables: {
                "email": "test@test.com",
                "password": "test"
            }
        })


        expect(result.data.login).toBeTruthy()
        const results = result.data.login
        expect(results.userId).toEqual("fb87ebd6-1373-4bf4-9277-153733ceb57f")
        expect(results.token).not.toBeNull()
        expect(results.tokenExpiration).toEqual(1)
        done()
    })
})