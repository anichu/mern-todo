import React from "react";
import "./Login.css";

const Addtodo = () => {
	return (
		<div className="form-box">
			<h1>Addtodo</h1>
			<form action="">
				<label htmlFor="">Task:</label>
				<input type="text" placeholder="write task...." />
				<label htmlFor="">Completed:</label>
				<input type="checkbox" />
				<button>Add-task</button>
			</form>
		</div>
	);
};

export default Addtodo;

<h1>Addtodo</h1>;
