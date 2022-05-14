import React, { Suspense } from "react";

import { Card, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { setAvailableWorkbooks } from "../counter/counterSlice.js";

import styles from "./WorkbookSelection.module.scss";

export default function WorkbookSelection() {
	const dispatch = useDispatch();
	const availableWorkbooks = useSelector((state) => state.counter.available_workbooks);

	React.useEffect(() => {
		fetch("http://127.0.0.1:8000/api/workbooks/")
			.then((response) => response.json())
			.then((data) => dispatch(setAvailableWorkbooks(data)));
	}, []);

	return (
		<section className="col-10 mx-auto">
			<h1 className={`${styles.welcomeHeader} display-1`}>Welcome!</h1>

			<p>Please select one of the available workbooks to begin:</p>

			<Suspense fallback={<div>Loading ... </div>}>
				<div className="row">
					{availableWorkbooks.map((workbook) => (
						<a href={`?wb=${workbook.slug}`} key={workbook.slug}>
							<div className="col-md-4">
								<Card>
									<Card.Header as="h5">{workbook.name}</Card.Header>
									<Card.Body>
										<Card.Text>{workbook.description}</Card.Text>
										<div className="d-inline-flex  w-100 mt-0">
											{workbook.tags.map((tag) => (
												<span className="badge rounded-pill bg-info text-dark" key={tag}>
													{tag}
												</span>
											))}
										</div>
										{/* <Button variant="primary">Go somewhere</Button> */}
									</Card.Body>
								</Card>
							</div>
						</a>
					))}
				</div>
			</Suspense>
		</section>
	);
}
