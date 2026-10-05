const request = require("supertest");
const app = require("../app");

describe("GET /tasks", () => {
    test("should return all tasks", async () => {
        const response = await request(app).get("/tasks")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});