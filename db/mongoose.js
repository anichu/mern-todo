const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://anis:anis@practice.dd8bw.mongodb.net/todo?retryWrites=true&w=majority"
	)
	.then(() => console.log("connected to DB"))
	.catch((err) => {
		console.log(err);
	});
