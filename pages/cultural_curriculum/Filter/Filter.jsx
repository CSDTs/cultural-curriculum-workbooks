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

				<div className="col-md-4">
					<DropdownButton id="dropdown-item-button" title="Dropdown button">
						<Dropdown.ItemText className="advanced-filter">
							<Accordion>
								<Accordion.Item eventKey="0">
									<Accordion.Header>Grade Level</Accordion.Header>
									<Accordion.Body>
										<Form>
											{["Elementary", "Middle", "High"].map((type) => (
												<div key={`default-${type}`} className="mb-3">
													<Form.Check type="checkbox" id={`default-${type}`} label={`${type} School`} />
												</div>
											))}
										</Form>
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>Accordion Item #2</Accordion.Header>
									<Accordion.Body>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
										et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Dropdown.ItemText>
					</DropdownButton>
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
