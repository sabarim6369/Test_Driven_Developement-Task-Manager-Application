const request = require("supertest");
const app = require("../app");

describe("GET /tasks", () => {

    test("should return all tasks", async () => {
        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("should return tasks as an array", async () => {
        const response = await request(app)
            .get("/tasks");

        expect(Array.isArray(response.body)).toBe(true);
    });
});


describe("POST /tasks", () => {

    test("should create a task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Learn TDD"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Learn TDD");
        expect(response.body.completed).toBe(false);
    });

    test("should reject task without title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Title is required");
    });
});


describe("GET /tasks/:id", () => {

    test("should return a task by id", async () => {

        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Learn Jest"
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .get(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(taskId);
        expect(response.body.title).toBe("Learn Jest");
    });

    test("should return 404 when task does not exist", async () => {

        const response = await request(app)
            .get("/tasks/999");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Task not found");
    });
});


describe("PUT /tasks/:id", () => {

    test("should update a task", async () => {

        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Learn TDD"
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: "Learn Advanced TDD",
                completed: true
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Learn Advanced TDD");
        expect(response.body.completed).toBe(true);
    });

    test("should return 404 when updating non-existing task", async () => {

        const response = await request(app)
            .put("/tasks/999")
            .send({
                title: "Something"
            });

        expect(response.statusCode).toBe(404);
    });
});


describe("DELETE /tasks/:id", () => {

    test("should delete a task", async () => {

        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Delete me"
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(204);
    });

    test("should return 404 when deleting non-existing task", async () => {

        const response = await request(app)
            .delete("/tasks/999");

        expect(response.statusCode).toBe(404);
    });
});