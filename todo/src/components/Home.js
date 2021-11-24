import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import loading from "../assets/icons8-spinner.gif";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Edittodo from "./Edittodo";

const Home = () => {
	const [task, setTask] = useState([]);
	const [animate, setAnimate] = useState(true);
	const [selectTask, setSelectTask] = useState("incompleted");
	const [alert, setAlert] = useState(true);
	// const Navigate = useNavigate();

	useEffect(() => {
		const fetchTask = async () => {
			const response = await fetch("http://localhost:8000/tasks", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: Cookies.get("token"),
				},
			});
			const data = await response.json();
			setAnimate((pre) => !pre);
			setTask([...data.tasks]);
		};
		fetchTask();
	}, []);

	const updateHandler = async (id, completed) => {
		const response = await fetch(`http://localhost:8000/task/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: Cookies.get("token"),
			},
			body: JSON.stringify({ completed }),
		});
		const data = await response.json();
		if (response.ok) {
			// window.location.reload(false);
			// fetchTask();
		}
		setTask([...data.tasks]);
	};
	const selectHandler = (e) => {
		setSelectTask(e.target.value);
	};
	const deleteHandler = async (id) => {
		console.log(id);
		const response = await fetch(`http://localhost:8000/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: Cookies.get("token"),
			},
		});

		const data = await response.json();
		console.log(data);
		if (response.ok) {
			setTask([...data.tasks]);
		}
	};

	return (
		<div className="form-box">
			<h1>let's finish the Job</h1>
			<div className="task-box">
				{animate && (
					<center>
						<div className="task-img-box">
							<img src={loading} alt="loading...." />
						</div>
					</center>
				)}
				{!animate && (
					<div>
						<div className="select-box">
							<select onChange={selectHandler}>
								<option value="incompleted">incompleted</option>
								<option value="completed">completed</option>
							</select>
						</div>
						<hr />
						{task.map((t) => (
							<div key={t._id} className="task-box-1">
								{selectTask === "incompleted" && !t.completed && (
									<>
										<input
											type="checkbox"
											checked={t.completed}
											onChange={() => updateHandler(t._id, t.completed)}
										/>
										<p>{t.description}</p>
										<span
											className="delete-icon"
											onClick={() => deleteHandler(t._id)}
										>
											<i className="fas fa-trash" title="delete"></i>
										</span>
										<span className="edit-icon">
											<i class="fas fa-edit"></i>
										</span>
									</>
								)}
								{selectTask === "completed" && t.completed && (
									<>
										{" "}
										<input
											type="checkbox"
											checked={t.completed}
											onChange={() => updateHandler(t._id, t.completed)}
										/>
										<p>{t.description}</p>
										<span
											className="delete-icon"
											onClick={() => deleteHandler(t._id)}
										>
											<i className="fas fa-trash" title="delete"></i>
										</span>
										<Link to="edittodo" className="edit-icon">
											<i class="fas fa-edit"></i>
										</Link>
									</>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
