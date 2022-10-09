import React, { useState } from "react";
// import { Form } from "react-bootstrap";
import ItemList from "../Application/ItemList";

export default function Search({ apps, setFiltered, setSearchResult, setSearchField, searchField }) {
	// const [searchField, setSearchField] = useState("");

	const filtered = apps.filter((item) => {
		return item.name.toLowerCase().includes(searchField.toLowerCase());
		// ||
		// item
		// .tags
		// .toLowerCase()
		// .includes(searchField.toLowerCase())
	});

	function searchList() {
		return <ItemList filtered={filtered} />;
	}

	const handleChange = (e) => {
		setSearchField(e.target.value);
	};

	// console.log(filtered); uncommenting these lines, makes everything go into infinte loop
	// setFiltered(filtered);

	//comment out the div section to have only the search bar. To test search I added the SearchList part.

	return (
		<>
			<div className="col-md-4">
				{/* <Form.Control type="search" placeholder="Search in applications" onChange={handleChange} /> */}
			</div>
			{/* <div className={`applications`}>
                {searchResult.map((app) => (
                    <Application {...app} key={app.name} />
                ))}
            </div> */}
			<div>{searchList()}</div>
		</>
	);
}
