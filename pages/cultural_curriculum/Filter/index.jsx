import React from "react";
// import { Form, DropdownButton, Dropdown, Accordion } from "react-bootstrap";
import ItemList from "../Application/ItemList";
export default function AdvancedFilter({ setFiltered, apps }) {
	// Each option has its own state for filtering
	const [filteredCategories, setFilteredCategories] = React.useState("All");
	const [filteredSearch, setFilteredSearch] = React.useState(0);
	const [filteredTags, setFilteredTags] = React.useState([]);

	//Added ability to just create a relevant list of categories based on the API call
	let categories = apps
		.map((app) => {
			return app.category;
		})
		.filter((app) => app != null);

	//Handle the search bar filtering
	const handleChange = (e) => {
		setFilteredSearch(e.target.value);
	};

	//Handle the category filtering
	const handleCategoryChange = (event) => {
		setFilteredCategories(event.target.value);
	};

	//Handle the tag filtering
	const handleTagGroupChange = (event) => {
		let tags = [...filteredTags];
		let checkValue = event.target.value;

		if (tags.includes(checkValue)) tags = tags.filter((tag) => tag != checkValue);
		else tags.push(checkValue);
		setFilteredTags(tags);
	};

	//? Not sure what this was supposed to be for
	// function searchList() {
	// 	return <ItemList filtered={[]} />;
	// }

	//Apps render only when one of the three passed options are changed
	React.useEffect(() => {
		//If user doesn't do anything, just return the set of apps as is.
		if (filteredCategories === "All" && filteredSearch == "" && filteredTags == []) {
			setFiltered(apps);
			return;
		}

		//Create the filtered list of apps
		const filtered = apps.filter((app) => {
			//Category check
			let cat = filteredCategories == "All" ? true : app.category === filteredCategories;

			//Search bar check
			let str = filteredSearch == "" ? true : app.name.toLowerCase().includes(filteredSearch.toLowerCase());

			//Tag check
			let res =
				filteredTags.length == 0
					? true
					: filteredTags.reduce((acc, tag) => {
							return acc || app.tags.includes(tag);
					  }, false);

			//Return true if app matches all given criteria (also set default states to true to allow for blank entries)
			return cat && str && res;
		});

		setFiltered(filtered);
	}, [filteredCategories, filteredSearch, filteredTags]);

	return (
		<>
			<div className="row">
				<div className="col-md-4">
					{/* Advanced Filtering with checkboxes. For users who really wants specific results */}
					{/* Could be separated into its own component */}
					{/* <DropdownButton id="dropdown-item-button" title="Filter" className="btn-block" block>
						<Dropdown.ItemText className="advanced-filter">
							<Accordion defaultActiveKey="0">
								<Accordion.Item eventKey="0">
									<Accordion.Header>Grade Level</Accordion.Header>
									<Accordion.Body>
										<Form>
											{["Elementary", "Middle", "High"].map((type) => (
												<div key={`default-${type}`} className="mb-3">
													<Form.Check
														type="checkbox"
														id={`default-${type}`}
														label={`${type} School`}
														value={type}
														onChange={handleTagGroupChange}
													/>
												</div>
											))}
										</Form>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Dropdown.ItemText>
					</DropdownButton> */}
				</div>
				<div className="col-md-4">
					{/* Category grouping for users who just want generic results*/}
					{/* Could be separated into its own component */}
					{/* <Form.Select
						aria-label="Default select example"
						name="category-list"
						id="category-list"
						onChange={handleCategoryChange}>
						<option value="All">All Categories</option>
						{[...new Set(categories)].map((type) => (
							<option value={`${type}`}>{type}</option>
						))}
					</Form.Select> */}
				</div>
				<div className="col-md-4">
					{/* Search bar for users who knows the name of the app they want*/}
					{/* Could be separated into its own component */}
					{/* <Form.Control type="text" placeholder="Search in applications" onChange={handleChange} /> */}
					{/* Not sure what search list does still.  */}
					{/* <span>{searchList()}</span> */}
				</div>
			</div>
		</>
	);
}
