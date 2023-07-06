function ImageModal() {
	function closeModal() {
		const modal = document.getElementById("img-modal") as HTMLDialogElement;
		modal.close();
	}

	return (
		<dialog id="img-modal">
			<img src="./src/assets/hiragana-characters.png" alt="placeholder" />
			<button className="close-modal" onClick={closeModal}>
				X
			</button>
		</dialog>
	);
}

export default ImageModal;
