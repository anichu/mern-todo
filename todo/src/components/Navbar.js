import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<div className="nav-box">
			<h1 className="nav-h1">Todo</h1>
			<ul className="link-item">
				<li>
					<Link to="/">home</Link>
				</li>
				<li>
					<Link to="/addtodo">add-todo</Link>
				</li>
				<li>
					<Link to="/login">register</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
