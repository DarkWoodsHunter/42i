const Jest = require("jest");
const request = require("supertest")
const app = require("../Src/App")

describe("GET /Tasks", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/Tasks").send();
        expect(response.statusCode).toBe(200);
    })
})