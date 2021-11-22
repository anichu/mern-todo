const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/task", auth, async (req, res) => {
	try {
		const task = new Task(req.body);
		await task.save();
		console.log(req.body);
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send();
	}
});

router.get("/task", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (err) {
		res.status(400).send();
	}
});

router.get("/task/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const task = await Task.findById(id);
		res.send(task);
	} catch (err) {
		res.status(404).send();
	}
});

router.patch("/task/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		const update = updates.filter(
			(upd) => allowedUpdates.includes(upd) === false
		);
		return res
			.status(400)
			.json({ message: `invalid request ${update ? update : ""}` });
	}

	const id = req.params.id;
	try {
		const task = await Task.findById(id);
		task.description = req.body.description
			? req.body.description
			: task.description;
		task.completed = req.body.completed ? req.body.completed : task.completed;
		const updated_task = await task.save();
		res.status(200).json({
			message: updated_task,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}

	const task = Task.findById(id);
});

module.exports = router;
