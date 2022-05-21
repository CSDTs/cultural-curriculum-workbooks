import React, { Suspense, useState } from "react";

import { Card, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { setAvailableWorkbooksData } from "../../slices/workbookSlice";
import styles from "./WorkbookSelection.module.scss";

export default function WorkbookSelection() {
	const dispatch = useDispatch();
	const isProduction = import.meta.env.PROD;
	const [isError, setIsError] = useState(false);

	const availableWorkbooks = useSelector((state) => state.workbookState.workbook.available_workbooks);

	const createWorkbookLink = (slug) => {
		if (isProduction) return `/workbooks/start_${slug}`;
		return `?wb=${slug}`;
	};

	const createFetchLink = () => {
		if (isProduction) return `/api/workbooks/`;
		return "http://127.0.0.1:8000/api/workbooks/";
	};

	const getWorkbooks = () => {
		fetch(createFetchLink())
			.then((response) => response.json())
			.then((data) => {
				if (!Array.isArray(data)) throw new Error("Unable to reach api ");
				if (data.length == 0) throw new Error("No workbooks available");
				dispatch(setAvailableWorkbooksData(data));
			})
			.catch((err) => {
				setIsError(true);
			});
	};

	React.useEffect(() => {
		getWorkbooks();
	}, []);

	return (
		<section className="col-10 mx-auto">
			<h1 className={`${styles.welcomeHeader} display-1`}>Welcome!</h1>

			<p>Please select one of the available workbooks to begin:</p>
			<div className="row">
				{!isError &&
					availableWorkbooks.length > 0 &&
					availableWorkbooks.map((workbook) => (
						<a href={`${createWorkbookLink(workbook.slug)}`} key={workbook.slug} className={styles.card}>
							<div className="col-md-4">
								<Card className={`${styles.cardBody} shadow`}>
									<Card.Header as="h5" className={styles.header}>
										{workbook.name}
									</Card.Header>
									<Card.Body>
										<Card.Text className={styles.content}>{workbook.description}</Card.Text>
										<div className={`d-inline-flex w-100 mt-0 ${styles.cardTags}`}>
											{workbook.tags.map((tag) => (
												<span className="badge rounded-pill " key={tag}>
													{tag}
												</span>
											))}
										</div>
									</Card.Body>
								</Card>
							</div>
						</a>
					))}
			</div>

			{isError && (
				<div className="row mt-5">
					<div className="col-6">
						<p>
							There seems to be an issue with fetching our workbooks. If this persists, please contact us at{" "}
							<strong>
								<a href="mailto:csdtdevelopers@umich.edu" className={styles.emailLink}>
									csdtdevelopers@umich.edu
								</a>
							</strong>
						</p>
					</div>
				</div>
			)}
		</section>
	);
}
