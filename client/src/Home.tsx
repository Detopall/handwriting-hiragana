import ImageModal from "./ImageModal";
import LetterList from "./LetterList";

function Home() {

	function handleModal() {
		const modal = document.getElementById("img-modal") as HTMLDialogElement;
		modal.showModal();
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
		</>
	);
}

export default Home;
