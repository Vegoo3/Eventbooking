const { createTestClient } = require('apollo-server-testing')
const { app, server } = require('@app')
const { query, mutate } = createTestClient(server)
const gql = require('graphql-tag')


describe("bookings, login user", () => {
    
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: true,
                userId: "fb87ebd6-1373-4bf4-9277-153733ceb57f"
            }
        };
    });

    it("booking event", async done => {
        const BOOK_EVENT = gql `
        mutation BOOK_EVENT($eventId: String!){
            bookEvent(eventId: $eventId){
                id
                event{
                    title
                }
                user{
                    email
                }
            }
        }
    `;

        const result = await mutate({
            query: BOOK_EVENT,
            variables: {
                "eventId": "9dac5144-d8c0-493a-a92e-df7558f577af"
            }
        })

        expect(result.data.bookEvent).toBeTruthy()
        const results = result.data.bookEvent
        expect(results.id).toBeTruthy()
        expect(results.event.title).toEqual("test")
        expect(results.user.email).toEqual("test@test.com")
        done()
    })    

    it("cancel booking", async done => {
        const CANCEL_BOOKING = gql `
        mutation CANCEL_BOOKING($bookingId: String!){
            cancelBooking(bookingId: $bookingId){
              id
              user{
                email
              }
              event{
                title
              }
            }
          }
    `;

        const result = await mutate({
            query: CANCEL_BOOKING,
            variables: {
                "bookingId": "22135f09-4299-44b9-a915-392f3b80b8bc"
            }
        })

        expect(result.data.cancelBooking).toBeTruthy()
        const results = result.data.cancelBooking
        expect(results.id).toBeTruthy()
        expect(results.event.title).toEqual("test")
        expect(results.user.email).toEqual("test@test.com")
        done()
    })    

    it("get bookings", async done => {
        const GET_BOOKINGS = gql `
        query{
            bookings{
              id
              user{
                email
              }
              event{
                title
              }
            }
          }
    `;

        const result = await mutate({
            query: GET_BOOKINGS,
            variables: {}
        })

        expect(result.data.bookings).toBeTruthy()
        const results = result.data.bookings.pop()
        expect(results.id).toBeTruthy()
        expect(results.event.title).toBeTruthy()
        expect(results.user.email).toBeTruthy()
        done()
    })    
})

describe("bookings, not login user", () => {
    
    beforeEach(() => {
        server.context = function(params) {
            return {
                isAuth: false,
                userId: "fb87ebd6-1373-4bf4-9277-153733ceb57f"
            }
        };
    });

    it("booking event", async done => {
        const BOOK_EVENT = gql `
        mutation BOOK_EVENT($eventId: String!){
            bookEvent(eventId: $eventId){
                id
                event{
                    title
                }
                user{
                    email
                }
            }
        }
    `;

        const result = await mutate({
            query: BOOK_EVENT,
            variables: {
                "eventId": "9dac5144-d8c0-493a-a92e-df7558f577af"
            }
        })

        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("Unauthenticated!")
        done()
    })    

    it("cancel booking", async done => {
        const CANCEL_BOOKING = gql `
        mutation CANCEL_BOOKING($bookingId: String!){
            cancelBooking(bookingId: $bookingId){
              id
              user{
                email
              }
              event{
                title
              }
            }
          }
    `;

        const result = await mutate({
            query: CANCEL_BOOKING,
            variables: {
                "bookingId": "22135f09-4299-44b9-a915-392f3b80b8bc"
            }
        })

        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("Unauthenticated!")
        done()
    })   
    
    it("get bookings", async done => {
        const GET_BOOKINGS = gql `
        query{
            bookings{
              id
              user{
                email
              }
              event{
                title
              }
            }
          }
    `;

        const result = await mutate({
            query: GET_BOOKINGS,
            variables: {}
        })

        expect(result.errors).toBeTruthy()
        const error = result.errors.pop()
        expect(error.message).toEqual("Unauthenticated!")
        done()
    })    

})