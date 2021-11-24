import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Addtodo = () => {
	const [check, setCheck] = useState(false);
	const [text, setText] = useState("");
	const Navigate = useNavigate();
	const addHandler = async (e) => {
		e.preventDefault();
		const add = {
			description: text,
			completed: check,
		};

		const response = await fetch("http://localhost:8000/task", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: Cookies.get("token"),
			},
			body: JSON.stringify(add),
		});
		const data = await response.json();
		if (response.ok) {
			Navigate("/");
		}
		// console.log(data);
	};
	return (
		<div className="form-box">
			<h1>Addtodo</h1>
			<form action="" onSubmit={addHandler}>
				<label htmlFor="">Task:</label>
				<input
					type="text"
					placeholder="write task...."
					onChange={(e) => setText(e.target.value)}
				/>
				<label htmlFor="">Completed:</label>
				<input
					type="checkbox"
					onChange={(e) => setCheck((prep) => !prep)}
					checked={check}
				/>
				<button>Add-task</button>
			</form>
		</div>
	);
};

export default Addtodo;
