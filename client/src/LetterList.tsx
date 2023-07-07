import hiraganaData from "./hiragana.json";

function LetterList() {
	function handleClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		const target = event.target as HTMLSpanElement;
		const letter = target.innerHTML;

		window.location.href = `/letters/${letter}`;
	}

	return (
		<div className="letter-list">
			{Object.entries(hiraganaData).map(([letter, index]) => (
				<span key={index} id={index.toString()} onClick={handleClick}>
					{letter}
				</span>
			))}
		</div>
	);
}

export default LetterList;
