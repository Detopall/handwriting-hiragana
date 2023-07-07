import { useNavigate, useParams } from "react-router-dom";
import DrawCanvas from "./DrawCanvas";
import hiraganaData from "./hiragana.json";

interface IExerciseResponse {
	prediction: boolean;
}

function Exercise() {
	const { letter } = useParams();
	const navigate = useNavigate();

	if (!letter) navigate("/");

	function handleGoBack() {
		navigate("/");
	}

	function clearCanvas() {
		const canvas = document.querySelector("canvas");
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.backgroundColor = "white";
	}

	function sendPrediction() {
		const canvas = document.querySelector("canvas");
		if (!canvas) return;
		const image = canvas.toDataURL("image/png");
		if (!letter) return;

		const classValue = hiraganaData[letter as keyof typeof hiraganaData];

		fetch("http://localhost:8000/predict", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				image: { image: image },
				class: classValue,
			}),
		})
			.then((response) => response.json())
			.then((data: IExerciseResponse) => {
				handlePrediction(data.prediction);
			})
			.catch((error) => {
				console.error("Prediction request error:", error);
			});
	}

	function handlePrediction(result: boolean) {
		const canvas = document.querySelector("canvas");
		const idOfExercise = hiraganaData[letter as keyof typeof hiraganaData];
		if (!canvas) return;
		const color = result ? "green" : "red";
		canvas.style.backgroundColor = color;

		// add to storage
		addToStorage(result, idOfExercise);

		// remove from other storage if it exists
		removeFromOtherStorage(result, idOfExercise);
	}

	function addToStorage(result: boolean, idOfExercise: number) {
		const storageKey = result ? "correct" : "incorrect";
		const storage = localStorage.getItem(storageKey);
		if (!storage) return;
		const parsedStorage: number[] = JSON.parse(storage) as number[];

		// check if the exercise has already been added to the storage
		if (parsedStorage.includes(idOfExercise)) return;

		const newStorage = [...parsedStorage, idOfExercise];
		localStorage.setItem(storageKey, JSON.stringify(newStorage));
	}

	function removeFromOtherStorage(result: boolean, idOfExercise: number) {
		const otherStorageKey = result ? "incorrect" : "correct";
		const otherStorage = localStorage.getItem(otherStorageKey);

		if (!otherStorage) return;
		const parsedOtherStorage: number[] = JSON.parse(
			otherStorage
		) as number[];

		const index = parsedOtherStorage.indexOf(idOfExercise);
		if (index > -1) {
			parsedOtherStorage.splice(index, 1);
			localStorage.setItem(
				otherStorageKey,
				JSON.stringify(parsedOtherStorage)
			);
		}
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
