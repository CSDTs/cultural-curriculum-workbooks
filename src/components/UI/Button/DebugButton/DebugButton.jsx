import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

import { serializeResponses } from "#utils/save";

export default function DebugButton({ getCallback, postCallback, putCallback }) {
	const saveData = useSelector((state) => state.workbookState.data);
	const currentUser = useSelector((state) => state.workbookState.user);
	const workbookData = useSelector((state) => state.workbookState.workbook);

	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				Debug API
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={() => getCallback()}>GET</Dropdown.Item>
				<Dropdown.Item onClick={() => postCallback()}>POST</Dropdown.Item>
				<Dropdown.Item onClick={() => putCallback()}>PUT</Dropdown.Item>
				<Dropdown.Item onClick={() => console.log(serializeResponses(currentUser, saveData))}>
					Serialize Data
				</Dropdown.Item>
				<Dropdown.Item onClick={() => console.log(workbookData)}>Print Workbook State</Dropdown.Item>
				<Dropdown.Item onClick={() => console.log(currentUser)}>Print User State</Dropdown.Item>
				<Dropdown.Item onClick={() => console.log(saveData)}>Print Data State</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}
