import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";
import { authContext } from "../context/auth";

const Navbar = () => {
	const [auth, setAuth] = useContext(authContext);

	return (
		<div className="nav-box">
			<h1 className="nav-h1">Todo</h1>
			<ul className="link-item">
				{auth && (
					<>
						<li>
							<Link to="/">home</Link>
						</li>
						<li>
							<Link to="/addtodo">add-todo</Link>
						</li>
						<li>
							<Link to="/logout">logout</Link>
						</li>
					</>
				)}
				{!auth && (
					<li>
						<Link to="/login">register</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
