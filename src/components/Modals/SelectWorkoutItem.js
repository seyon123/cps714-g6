import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function SelectWorkoutItem({ id, name, imageURL, exercises, addToRoutine, removeFromRoutine }) {
	const [workoutSelected, setWorkoutSelected] = useState(false);

	useEffect(() => {
		exercises.map((item) => item.id).includes(id) ? setWorkoutSelected(true) : setWorkoutSelected(false);
		console.log(exercises);
	}, [id, exercises]);

	function handleWorkoutSelected(checked) {
		setWorkoutSelected(checked);
		checked ? addToRoutine(`workouts/${id}`) : removeFromRoutine(`workouts/${id}`);
	}

	return (
		<Card className="newRoutine workoutItemCard hover-overlay shadow-1-strong" role="button" onClick={() => handleWorkoutSelected(!document.getElementById(`selectWorkout-${id}`).checked)}>
			<Card.Body className="d-flex align-items-center justify-content-between">
				<span className="d-flex align-items-center">
					<img className="workoutItemImg float-start" src={imageURL} alt={name}></img>
					<h3 className="float-start">{name}</h3>
				</span>
				<span>
					<input
						className="form-check-input"
						id={`selectWorkout-${id}`}
						type="checkbox"
						value={name}
						name="workout"
						checked={workoutSelected}
						onChange={(e) => handleWorkoutSelected(e.target.checked)}
					/>
				</span>
			</Card.Body>
		</Card>
	);
}

export default SelectWorkoutItem;
