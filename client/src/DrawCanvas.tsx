import { useEffect, useRef } from "react";

function DrawCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const isDrawing = useRef<boolean>(false);
	const context = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		context.current = canvas.getContext("2d");
		if (!context.current) return;

		context.current.strokeStyle = "black";
		context.current.lineWidth = 10;
		context.current.lineJoin = "round";
		context.current.lineCap = "round";

		const handleMouseDown = (event: MouseEvent) => {
			isDrawing.current = true;
			if (!context.current) return;
			context.current.beginPath();
			context.current.moveTo(event.offsetX, event.offsetY);
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (!isDrawing.current || !context.current) return;
			context.current.lineTo(event.offsetX, event.offsetY);
			context.current.stroke();
		};

		const handleMouseUp = () => {
			isDrawing.current = false;
		};

		const handleMouseLeave = () => {
			isDrawing.current = false;
		};

		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseup", handleMouseUp);
		canvas.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseup", handleMouseUp);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div className="canvas-container">
			<canvas ref={canvasRef} height={500} width={500}></canvas>
		</div>
	);
}

export default DrawCanvas;
