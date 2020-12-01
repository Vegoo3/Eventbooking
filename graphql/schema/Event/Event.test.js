const { createTestClient } = require('apollo-server-testing')
const { app, server } = require('@app')
const { query, mutate } = createTestClient(server)
const gql = require('graphql-tag')


describe("Events. not login user", () => {
    
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: false,
                userId: "884d1128-0c2b-41d3-8115-859522b09991"
            }
        };
    });

    it("get Events", async done => {
        const GET_EVENTS = gql `
        query{
            events{
                id
                title
                date
                date
                description
                creator{
                  email
                }
            }
        }
    `;

        const result = await query({
            query: GET_EVENTS,
            variables: {}
        })

        expect(result.data.events).toBeTruthy()
        done()
    })

    it("Create new event", async done => {
        const CREATE_EVENTS = gql `
        mutation CREATE_EVENT($title: String!, $date: String!, $description: String!, $price: Float!){
            createEvents(title: $title, date: $date, description: $description, price: $price){
              title
              date
              description
              price
              creator{
                email
              }
            }
          }
        `;

        const result = await mutate ({
            query: CREATE_EVENTS,
            variables: {
                "title": "Test",
                "date": "nigdy",
                "description": "create events when user is not login",
                "price": 99.99
            }
        })

        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("Unauthenticated!")
        done()
    })

    
})


describe("Create event, login", () => {
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: true,
                userId: "fb87ebd6-1373-4bf4-9277-153733ceb57f"
            }
        };
    });
    it("Create new event", async done => {
        
        const CREATE_EVENTS = gql `
        mutation CREATE_EVENT($title: String!, $date: String!, $description: String!, $price: Float!){
            createEvents(title: $title, date: $date, description: $description, price: $price){
              title
              date
              description
              price
              creator{
                email
              }
            }
          }
        `;

        const result = await mutate ({
            query: CREATE_EVENTS,
            variables: {
                "title": "Test",
                "date": "now",
                "description": "Create events when user is login",
                "price": 99.99
            }
        })

        expect(result.data.createEvents).toBeTruthy()
        const results = result.data.createEvents
        expect(results.title).toEqual("Test")
        expect(results.date).toEqual("now")
        expect(results.description).toEqual("Create events when user is login")
        expect(results.price).toEqual(99.99)
        expect(results.creator.email).toEqual("test@test.com")
        done()
    })
})