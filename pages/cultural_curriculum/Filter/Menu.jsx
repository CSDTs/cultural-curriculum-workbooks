import React, { useMemo } from "react";
// import { Form, DropdownButton, Dropdown, Accordion } from "react-bootstrap";
import ItemList from "../Application/ItemList";

export default function Menu({ apps, setFiltered, setSelectedOption, selectedOption }) {
	function handleCategoryChange(event) {
		setSelectedOption(event.target.value);
	}

	// Function to get filtered list for dropdown
	function getFilteredList() {
		// Avoid filter when selectedCategory is null
		if (selectedOption.length != 0) {
			if (selectedOption === "All Category") {
				console.log(selectedOption);
				console.log("inside All condition");
				return apps;
			}
			const filtered = apps.filter((app) => app.category === selectedOption);
			return filtered;
		}
		return apps;
	}

	const filtered = useMemo(getFilteredList, [selectedOption, apps]);
	console.log(filtered);
	setFiltered(filtered);

	function searchList() {
		return <ItemList filtered={filtered} />;
	}

	// This filtered parameter gets passed to the main parent (scroll down the page(after the blue dropdown button) to see results)
	return (
		<>
			<div className="col-md-4">
				{/* <Form.Select
					aria-label="Default select example"
					name="category-list"
					id="category-list"
					onChange={handleCategoryChange}>
					<option>All Category</option>
					<option value="Teacher">Teacher</option>
					<option value="Artisian">Artisian</option>
					<option value="Student">Student</option>
				</Form.Select> */}
			</div>
			{/* <div>{searchList()}</div> */}
		</>
	);
}
