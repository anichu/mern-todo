const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/user", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = user.generateAuthToken();
		res.status(201).json({
			user,
			token,
		});
	} catch (err) {
		res.json(400).json({
			message: err.message,
		});
	}
	user
		.save()
		.then((re) => {
			res.status(201).send(re);
		})
		.catch((err) => {
			res.send(err);
		});
});

router.post("/user/login", async (req, res) => {
	// console.log(req.body);
	try {
		const user = await User.findBycredentials(
			req.body.email,
			req.body.password
		);
		console.log(user);

		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
});

router.post("/user/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token !== req.token
		);
		await req.user.save();
		res.json({});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post("/user/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.json({});
	} catch (e) {
		res.status(500).json({});
	}
});

router.get("/user/me", auth, async (req, res) => {
	try {
		// const users = await User.find();
		res.json({ user: req.user });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		res.send(user);
	} catch (err) {
		res.status(404).send();
	}
});

router.patch("/user/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "password", "email"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid update" });
	}

	// const id = req.params.id;
	try {
		const user = await User.findOne({ email: req.user.email });
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();
		if (!user) {
			res.status(404).send();
		}
		res.send(user);
	} catch (err) {
		res.status(404).send();
	}
});

module.exports = router;
