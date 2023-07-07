import ImageModal from "./ImageModal";
import LetterList from "./LetterList";
import { useEffect } from "react";

function Home() {
	function handleModal() {
		const modal = document.getElementById("img-modal") as HTMLDialogElement;
		modal.showModal();
	}

	useEffect(() => {
		showResults();
	}, [localStorage.getItem("correct"), localStorage.getItem("incorrect")]);

	function showResults() {
		const spans = document.querySelectorAll("span");
		const correct = JSON.parse(
			localStorage.getItem("correct") || "[]"
		) as number[];
		const incorrect = JSON.parse(
			localStorage.getItem("incorrect") || "[]"
		) as number[];

		spans.forEach((span) => {
			const id = Number(span.id);
			if (correct.includes(id)) {
				span.style.backgroundColor = "green";
			} else if (incorrect.includes(id)) {
				span.style.backgroundColor = "red";
			}
		});
	}

	function handleClearResults() {
		localStorage.setItem("correct", JSON.stringify([]));
		localStorage.setItem("incorrect", JSON.stringify([]));
		location.reload();
	}

	return (
		<>
			<h2> Handwriting Hiragana Quiz</h2>
			<p> Pick a letter you would want to practice. </p>

			<LetterList />
			<ImageModal />
			<button className="show-modal" onClick={handleModal}>
				Show Cheat Sheet
			</button>
			<button className="clear-results" onClick={handleClearResults}>
				Clear Results
			</button>
		</>
	);
}

export default Home;
