import "./ExerciseInfoModal.css";
import { MdCancel } from "react-icons/md";

import { Modal, Carousel } from "react-bootstrap";

function ExerciseInfoModal(props) {
	const { show, onClose, workoutName, workoutImage, workoutDescription } = props;

	return (
		<Modal className="exerciseInfo_modal" show={show} onHide={onClose} centered>
			<Modal.Header>
				<Modal.Title>{workoutName}</Modal.Title>
				<span role="button" onClick={onClose}>
					<MdCancel size="2em" />
				</span>
			</Modal.Header>
			<Modal.Body>
				<Carousel variant="light">
					{workoutImage.map((image) => {
						return (
							<Carousel.Item>
								<img className="d-block w-100" src={image} alt="Carousel Images" />
							</Carousel.Item>
						);
					})}
				</Carousel>
				{workoutDescription.map((description) => {
					return (
						<div>
							{description}
							<br></br>
						</div>
					);
				})}
			</Modal.Body>
		</Modal>
	);
}

export default ExerciseInfoModal;
