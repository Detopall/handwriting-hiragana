import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Exercise from "./Exercise";

function App() {
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
