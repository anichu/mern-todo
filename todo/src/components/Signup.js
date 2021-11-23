import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signup.css";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const Navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		const person = {
			name: username,
			password,
			email,
		};
		const response = await fetch(`http://localhost:8000/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		});
		// console.log(response.status);
		const data = await response.json();
		console.log(data);
		if (response.ok) {
			Cookies.set("token", data.token, { expires: 7 });
			Navigate("/login");
		}

		setEmail("");
		setPassword("");
		setUsername("");
	};

	return (
		<div className="form-box">
			<h1>Signup</h1>
			<form action="" className="" onSubmit={submitHandler}>
				<label htmlFor="">username:</label>
				<input
					type="text"
					placeholder="username...."
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
				<br />
				<label htmlFor="">email:</label>
				<input
					type="email"
					placeholder="email...."
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<br />
				<label htmlFor="">password:</label>
				<input
					type="password"
					placeholder="password...."
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Signup</button>
				<p>
					or
					<Link to="/login" style={{ color: "red" }}>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signup;
