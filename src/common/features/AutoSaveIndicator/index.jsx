import { ButtonGroup, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RiSave2Fill } from "react-icons/ri";

import styles from "./AutoSaveIndicator.module.scss";
export default function AutoSaveIndicator() {
	const isSaving = useSelector((state) => state.workbookState.is_saving);
	return (
		<>
			{window.localStorage.getItem("autoSave") === "true" && (
				// <ButtonGroup aria-label="Third group">
				// 	<Button variant="success" className={styles.saveIcon}>
				// 		{/* {!isSaving && <RiSave2Fill />} */}
				// 		{isSaving && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
				// 		{isSaving && <p>Autosaving...</p>}
				// 	</Button>
				// </ButtonGroup>
				<>
					<span className="d-inline-flex align-content-center">
						{isSaving && (
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="text-white" />
						)}{" "}
						{isSaving && <p className="my-0  figure-caption">Autosaving...</p>}
					</span>
					{/* <span className="d-inline-flex align-content-center justify-content-between">
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="text-white" />{" "}
						<p className="my-0 figure-caption"> Autosaving...</p>
					</span> */}
				</>
			)}
		</>
	);
}
