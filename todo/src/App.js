import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Addtodo from "./components/Addtodo";

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/addtodo" element={<Addtodo />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
