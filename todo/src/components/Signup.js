import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
	return (
		<div className="form-box">
			<h1>Signup</h1>
			<form action="" className="">
				<label htmlFor="">username:</label>
				<input type="text" placeholder="username...." />
				<br />
				<label htmlFor="">email:</label>
				<input type="email" placeholder="email...." />
				<br />
				<label htmlFor="">password:</label>
				<input type="password" placeholder="password...." />
				<button type="submit">Login</button>
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
