import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import WorkbookSelectionCard from "./WorkbookSelectionCard";
import Spinner from "react-bootstrap/Spinner";
import { setAvailableWorkbooksData } from "../../slices/workbookSlice";
import styles from "./WorkbookSelection.module.scss";

const createFetchLink = () => {
	if (import.meta.env.PROD) return `/api/workbooks/`;
	return "https://csdt.org/api/workbooks/";
};

const getWorkbooks = (setIsError, dispatch) => {
	fetch(createFetchLink())
		.then((response) => response.json())
		.then((data) => {
			if (!Array.isArray(data)) throw new Error("Unable to reach api ");
			if (data.length == 0) throw new Error("No workbooks available");
			dispatch(setAvailableWorkbooksData(data));
		})
		.catch((err) => {
			console.error(err);
			setIsError(true);
		});
};

export default function WorkbookSelection() {
	const [isError, setIsError] = useState(false);
	const dispatch = useDispatch();

	const availableWorkbooks = useSelector((state) => state.workbookState.workbook.available_workbooks);

	React.useEffect(() => {
		getWorkbooks(setIsError, dispatch);
	}, []);

	return (
		<section className="col-10 mx-auto">
			<div className="container">
				<h1 className={`${styles.welcomeHeader} display-1`}>Welcome!</h1>

				<p>Please select one of the available workbooks to begin:</p>
				<div className="row">
					{!isError &&
						availableWorkbooks.length > 0 &&
						availableWorkbooks.map((workbook, index) => (
							<WorkbookSelectionCard workbook={workbook} key={workbook.name + "_" + index} />
						))}
				</div>
			</div>

			{!isError && availableWorkbooks.length == 0 && (
				<Spinner animation="border" role="status" variant="primary">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
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
