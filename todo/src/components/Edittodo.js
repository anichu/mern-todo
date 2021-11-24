import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Edittodo = () => {
	const [check, setCheck] = useState(false);
	const [text, setText] = useState("");
	const Navigate = useNavigate();
	const { id } = useParams();
	// console.log({ id });

	useEffect(() => {
		const fetchEdittodo = async () => {
			const response = await fetch(`http://localhost:8000/task/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: Cookies.get("token"),
				},
			});
			const data = await response.json();
			if (response.ok) {
				setCheck(data.task.completed);
				setText(data.task.description);
			}
		};
		fetchEdittodo();
	}, [id]);
	const addHandler = async (e) => {
		e.preventDefault();
		const add = {
			description: text,
			completed: check,
		};

		const response = await fetch(`http://localhost:8000/task/${id}`, {
			method: "PATCH",
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
			<h1>Edit-Todo</h1>
			<form action="" onSubmit={addHandler}>
				<label htmlFor="">Task:</label>
				<input
					type="text"
					placeholder="write task...."
					onChange={(e) => setText(e.target.value)}
					value={text}
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

export default Edittodo;
