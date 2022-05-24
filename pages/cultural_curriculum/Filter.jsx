import React from "react";
import { Form, DropdownButton, Dropdown, Accordion } from "react-bootstrap";
export default function Filter({ setActiveTags, activeTags, setFiltered, apps }) {
	React.useEffect(() => {
		if (activeTags === 0) {
			setFiltered(apps);
			return;
		}
		const filtered = apps.filter((app) => {
			return app.tags.includes(activeTags);
		});

		console.log(filtered);
		setFiltered(filtered);
	}, [activeTags]);

	return (
		<>
			<div className="row">
				<div className="col-md-4">
					<Form.Select aria-label="Default select example">
						<option>Open this select menu</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</Form.Select>
				</div>
				<div className="col-md-4">
					<Form.Control type="text" placeholder="Search in applications" />
				</div>
			</div>

			<div className="filter-container">
				<button className={activeTags === 0 ? "active" : ""} onClick={() => setActiveTags(0)}>
					All
				</button>
				<button
					className={activeTags === "Discrete Iteration" ? "active" : ""}
					onClick={() => setActiveTags("Discrete Iteration")}>
					Discrete Iteration
				</button>
				<button
					className={activeTags === "Across Cultures" ? "active" : ""}
					onClick={() => setActiveTags("Across Cultures")}>
					Across Cultures
				</button>
			</div>
		</>
	);
}
