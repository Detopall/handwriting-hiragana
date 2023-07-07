import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Exercise from "./Exercise";

function App() {
	function createLocalStorageEnvironment() {
		if (localStorage.getItem("correct") && localStorage.getItem("incorrect")) return;
		localStorage.setItem("correct", JSON.stringify([]));
		localStorage.setItem("incorrect", JSON.stringify([]));
	}

	createLocalStorageEnvironment();

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/letters/:letter" element={<Exercise />} />
			</Routes>
		</div>
	);
}

export default App;
