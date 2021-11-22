const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 4,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid Email");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "ilovemydreams", {
		expiresIn: 60 * 60 * 24,
	});
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findBycredentials = async (email, password) => {
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		throw new Error("Unable to login");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Unable to login");
	}

	console.log(user);

	return user;
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.pre("remove", async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
