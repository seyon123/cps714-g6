import { useState, useEffect } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { doc, addDoc, getDoc, deleteDoc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { MdAddCircleOutline } from "react-icons/md";
import ExerciseItem from "./ExerciseItem";
import SelectWorkoutItem from "./SelectWorkoutItem";
import "./CreateRoutineModal.css";

function CreateRoutineModal({ show, onHide, setModalShow, currentRoutine, setCurrentRoutine }) {
	const { currentUser } = useAuth();
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [routineName, setRoutineName] = useState("");
	const [showWorkoutList, viewWorkoutList] = useState(false);

	useEffect(
		() =>
			onSnapshot(collection(db, `workouts`), (snapshot) => {
				setWorkouts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			}),
		[currentUser.uid]
	);

	useEffect(() => {
		setExercises(currentRoutine.exercises);
		setRoutineName(currentRoutine.name);
	}, [currentRoutine]);

	const resetState = () => {
		setExercises([]);
		setRoutineName("");
		setCurrentRoutine({ name: "", exercises: [] });
		viewWorkoutList(false);
		setModalShow(false);
	};

	const addToRoutine = async (workoutPath) => {
		const docRef = doc(db, workoutPath);
		const docSnap = await getDoc(docRef);
		let exercisesList = exercises;
		exercisesList.push({ ref: docRef, id: docSnap.id, sets: 3, reps: 10 });
		setExercises(exercisesList);
	};

	const removeFromRoutine = async (workoutPath) => {
		const docToRemove = await getDoc(doc(db, workoutPath));
		let exercisesList = exercises;
		exercisesList = exercisesList.filter((item) => item.id !== docToRemove.id);
		setExercises(exercisesList);
	};

	function deleteRoutine() {
		const deleteRoutine = window.confirm("Are you sure you want to delete the routine called: " + routineName + "?");
		if (deleteRoutine) {
			deleteDoc(doc(db, `users/${currentUser.uid}/routines`, currentRoutine?.id));
			resetState();
		}
	}

	async function onSubmit() {
		if (exercises.length <= 0) {
			alert("You must add at least one exercise to your routine");
		} else if (routineName === "") {
			alert("You must give your routine a name");
		} else {
			if (currentRoutine.id) {
				await setDoc(doc(db, `users/${currentUser.uid}/routines`, currentRoutine.id), {
					name: routineName,
					exercises: exercises,
				});
			} else {
				await addDoc(collection(db, `users/${currentUser.uid}/routines`), {
					name: routineName,
					exercises: exercises,
				});
			}
			resetState();
		}
	}

	return (
		<Modal show={show} onHide={onHide} setModalShow={setModalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onExit={() => resetState()} className="create-routine">
			<Modal.Header closeButton closeVariant="white">
				<Modal.Title id="contained-modal-title-vcenter">
					{showWorkoutList ? (
						<h3>Select Workouts</h3>
					) : (
						<input required maxLength="50" value={routineName} className="routine-title" type="text" placeholder="New Routine Name" onChange={(e) => setRoutineName(e.target.value)} />
					)}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Container className="routine-modalContainer" style={{ display: !showWorkoutList ? "block" : "none" }}>
					{exercises?.map(({ id, ref }) => (
						<ExerciseItem key={id} docRef={ref} exercises={exercises} setExercises={setExercises} removeFromRoutine={removeFromRoutine} />
					))}
					<Card className="workoutItemCard hover-overlay" role="button" onClick={() => viewWorkoutList(true)}>
						<Card.Body className="d-flex align-items-center justify-content-center">
							<span className="pe-3">
								<MdAddCircleOutline size="3em" />
							</span>
							<h3>Add Workout</h3>
						</Card.Body>
					</Card>
				</Container>

				<Container className="workouts-selection-container" style={{ display: showWorkoutList ? "block" : "none" }}>
					{workouts.map(({ id, name, imageURL }) => {
						return <SelectWorkoutItem key={id} id={id} name={name} imageURL={imageURL} exercises={exercises} addToRoutine={addToRoutine} removeFromRoutine={removeFromRoutine} />;
					})}
				</Container>
			</Modal.Body>

			<Modal.Footer>
				{currentRoutine?.id && (
					<Button variant="danger" size="lg" onClick={() => deleteRoutine()}>
						Delete
					</Button>
				)}
				{showWorkoutList ? (
					<Button size="lg" closeButton onClick={() => viewWorkoutList(false)}>
						Select
					</Button>
				) : (
					<Button size="lg" onClick={() => onSubmit()}>
						Save
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default CreateRoutineModal;