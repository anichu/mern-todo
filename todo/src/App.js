import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Addtodo from "./components/Addtodo";
import Logout from "./components/Logout";
import { TodoContext } from "./context/auth";
import Edittodo from "./components/Edittodo";

function App() {
	return (
		<BrowserRouter>
			<TodoContext>
				<div className="app">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/signup" element={<Signup />} />
						<Route exact path="/addtodo" element={<Addtodo />} />
						<Route exact path="/logout" element={<Logout />} />
						<Route exact path="/edittodo" element={<Edittodo />} />
					</Routes>
					<Footer />
				</div>
			</TodoContext>
		</BrowserRouter>
	);
}

export default App;
