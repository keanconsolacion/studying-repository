const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
require("dotenv").config({ path: "../.env" });

const testUserId = new mongoose.Types.ObjectId();
const testUser = {
	_id: testUserId,
	name: "Jessye",
	email: "jessye@gmail.com",
	password: "jessye123123",
	tokens: [
		{
			token: jwt.sign({ _id: testUserId }, process.env.JWT_SECRET),
		},
	],
};
const testUserId2 = new mongoose.Types.ObjectId();
const testUser2 = {
	_id: testUserId2,
	name: "Kean",
	email: "keanconsolacion@gmail.com",
	password: "kean123123",
	tokens: [
		{
			token: jwt.sign({ _id: testUserId2 }, process.env.JWT_SECRET),
		},
	],
};

const task1 = {
	_id: new mongoose.Types.ObjectId(),
	description: "description for task1",
	completed: false,
	owner: testUser._id,
};

const task2 = {
	_id: new mongoose.Types.ObjectId(),
	description: "description for task2",
	completed: true,
	owner: testUser._id,
};

const task3 = {
	_id: new mongoose.Types.ObjectId(),
	description: "description for task3",
	completed: true,
	owner: testUser2._id,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(testUser).save();
	await new User(testUser2).save();

	await Task.deleteMany();
	await new Task(task1).save();
	await new Task(task2).save();
	await new Task(task3).save();
};

module.exports = {
	testUserId,
	testUser,
	testUserId2,
	testUser2,
	task1,
	task2,
	task3,
	setupDatabase,
};
