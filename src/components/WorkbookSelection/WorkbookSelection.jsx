import React from "react";

import AVAILABLE_WORKBOOKS from "../../data";

import { Form } from "react-bootstrap";

export default function WorkbookSelection() {
	return (
		<Form.Select aria-label="Default select example">
			<option>Open this select menu</option>
			<option value="1">One</option>
			<option value="2">Two</option>
			<option value="3">Three</option>
		</Form.Select>
	);
}
