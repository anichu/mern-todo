import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
	return (
		<div className="form-box">
			<h1>Login</h1>
			<form action="" className="">
				<label htmlFor="">email:</label>
				<input type="email" placeholder="email...." />
				<br />
				<label htmlFor="">password:</label>
				<input type="password" placeholder="password...." />
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
