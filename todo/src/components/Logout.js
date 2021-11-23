import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../context/auth";

const Logout = () => {
	const Navigate = useNavigate();
	const [auth, setAuth] = useContext(authContext);
	return (
		<div className="form-box">
			<form action="">
				<button
					type="button"
					onClick={() => {
						Cookies.remove("token");
						setAuth(false);
						Navigate("/login");
					}}
				>
					Logout
				</button>{" "}
				<span>Or</span> <button type="button">Cancel</button>
			</form>
		</div>
	);
};

export default Logout;
