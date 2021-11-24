const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.post("/task", auth, async (req, res) => {
	try {
		const task = new Task({ ...req.body, owner: req.user._id });
		await task.save();
		console.log(req.body);
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send();
	}
});

router.get("/tasks", auth, async (req, res) => {
	try {
		const tasks = await Task.find({ owner: req.user._id });
		// await req.user.populaate("tasks");
		res.json({ tasks });
	} catch (err) {
		res.status(400).send();
	}
});

router.get("/task/:id", auth, async (req, res) => {
	const id = req.params.id;
	try {
		const task = await Task.findOne({ _id: id, owner: req.user._id });
		if (!task) {
			throw new Error("Not find task!");
		}
		res.json({ task });
	} catch (err) {
		res.status(404).send();
	}
});

router.patch("/task/:id", auth, async (req, res) => {
	console.log(req.body);
	console.log(typeof req.body.completed);
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
		const task = await Task.findOne({ _id: id, owner: req.user._id });
		task.description = req.body.description
			? req.body.description
			: task.description;
		if (req.body.completed === true || req.body.completed === false) {
			const check = !req.body.completed;
			// console.log(check);
			task.completed = check;
		}

		// task.completed = req.body.completed ? req.body.completed : task.completed;
		const updated_task = await task.save();
		const tasks = await Task.find({ owner: req.user._id });

		res.status(200).json({ tasks });
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

router.delete("/tasks/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) {
			return res.status(404).send();
		}
		const tasks = await Task.find({ owner: req.user._id });
		res.json({ tasks });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
