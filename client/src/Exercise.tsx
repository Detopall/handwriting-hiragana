import { useNavigate, useParams } from "react-router-dom";
import DrawCanvas from "./DrawCanvas";

function Exercise() {
	const { letter } = useParams();
	const navigate = useNavigate();

	if (!letter) navigate("/");

	function handleGoBack() {
		navigate(-1);
	}

	function clearCanvas() {
		const canvas = document.querySelector("canvas");
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	function sendPrediction(): void {
		const canvas = document.querySelector("canvas");
		if (!canvas) return;
		const image = canvas.toDataURL("image/png");
		
		fetch("http://localhost:3000/predict", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ image: image }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Prediction request error:", error);
			});
	}

	return (
		<section id="exercise">
			<h2> {letter} </h2>
			<p>Draw the hiragana character that "{letter}" corresponds to</p>
			<DrawCanvas />
			<div className="exercise-buttons-container">
				<button onClick={handleGoBack} className="go-back-button">
					Go Back
				</button>
				<button onClick={clearCanvas} className="clear-button">
					Clear
				</button>
				<button onClick={sendPrediction} className="predict-button">
					Predict
				</button>
			</div>
		</section>
	);
}

export default Exercise;
