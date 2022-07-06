const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { testUser, testUser2, task1, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
	const response = await request(app)
		.post("/tasks")
		.set("Authorization", `Bearer ${testUser.tokens[0].token}`)
		.send({ description: "just a test" })
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toBe(false);
});

test("Should get all tasks for user", async () => {
	const response = await request(app)
		.get("/tasks")
		.set("Authorization", `Bearer ${testUser.tokens[0].token}`)
		.expect(200);
	expect(response.body.length).toBe(2);
});

test("Should not delete task if owner is different", async () => {
	await request(app)
		.delete("/task")
		.set("id", task1._id)
		.set("Authorization", `Bearer ${testUser2.tokens[0].token}`)
		.expect(404);

	const task = await Task.findById(task1._id);
	expect(task).not.toBeNull();
});
