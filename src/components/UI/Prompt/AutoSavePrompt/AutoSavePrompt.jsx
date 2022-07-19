import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./AutoSavePrompt.module.scss";
export default function AutoSavePrompt(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className={styles.prompt}>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Auto Saving</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Would you like to enable auto saving?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Yes</Button>
				<Button onClick={props.onHide}>No</Button>
			</Modal.Footer>
		</Modal>
	);
}
