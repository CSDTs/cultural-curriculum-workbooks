import React from "react";
import { Card } from "react-bootstrap";
import styles from "./WorkbookSelection.module.scss";

const createWorkbookLink = (slug) => {
	if (import.meta.env.PROD) return `/workbooks/start_${slug}`;
	return `?wb=${slug}`;
};

export default function WorkbookSelectionCard({ workbook }) {
	return (
		<a href={`${createWorkbookLink(workbook.slug)}`} key={workbook.slug} className={`${styles.card} col-md-4`}>
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
		</a>
	);
}
