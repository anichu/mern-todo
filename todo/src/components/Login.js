import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Cookies from "js-cookie";
import { authContext } from "../context/auth";

const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const Navigate = useNavigate();
	const [auth, setAuth] = useContext(authContext);

	const loginHandler = async (e) => {
		e.preventDefault();
		const login = {
			email,
			password,
		};

		const response = await fetch(`http://localhost:8000/user/login`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: Cookies.get("token"),
			},
			body: JSON.stringify(login),
		});

		const data = await response.json();
		console.log(data);
		if (response.ok) {
			setAuth(true);
			Cookies.set("token", data.token, { expires: 7 });
			Navigate("/");
		}
		setEmail("");
		setPassword("");
	};
	return (
		<div className="form-box">
			<h1>Login</h1>
			<form action="" className="" onSubmit={loginHandler} autoComplete="off">
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
					value={password}
				/>
				<button type="submit">Login</button>
				<p>
					or{" "}
					<Link to="/signup" style={{ color: "red" }}>
						{" "}
						SignUp
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
