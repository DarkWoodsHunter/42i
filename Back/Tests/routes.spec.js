const request = require("supertest")
const app = require("../Src/App")
const mongoose = require("mongoose")


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect("mongodb+srv://ImperialUser:A159753eW@cluster0.sh4t9uz.mongodb.net/42i_MondoDB?retryWrites=true&w=majority&appName=Cluster0");
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});


//testing with simple url and a 200 status response
describe("GET /Tasks", () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get("/Tasks/Ping").send();
        expect(response.statusCode).toBe(200);
    });
    //Test for getting all Tasks
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get("/Tasks").send();
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

});
//Test for Creating New Tasks
describe("POST /Tasks", () => {
    describe("Give Tittle, Description, Status", () => {
        const newTask = {
            Tittle: "TestTittle",
            Description: "Lorem Ipsum",
            Status: "backlog",
        };

        test("should respond with a 200 Status code", async () => {
            const response = await request(app).post("/Tasks/AddTask").send(newTask);
            expect(response.statusCode).toBe(200)
        })
    })
})