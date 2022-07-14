export default function ConceptCheck({ description, data, currentAnswers, callback }) {
	const correctAnswers = Object.keys(data).reduce((total, current) => {
		return total.concat(data[current].isCorrect);
	}, []);
	return (
		<>
			<h3>Concept Check</h3>
			<p>{description}</p>

			<Form onSubmit={callback}>
				{Object.keys(data).map((opt, index) => (
					<div key={`${opt}-checkbox`} className="mb-3">
						<Form.Check
							type="checkbox"
							id={`${opt}-checkbox`}
							label={createLabel(data[opt].label, currentAnswers[index], data[opt].isCorrect)}
							value={opt}
							className="d-inline-block"
						/>{" "}
					</div>
				))}
				<Button variant="primary" type="submit" className=" w-100">
					{currentAnswers ? "Try Again?" : "Check Answers"}
				</Button>

				{currentAnswers && (
					<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
						<p>
							{Object.keys(data).map((item, index) => (
								<strong key={`${index}-sss`}>
									{currentAnswers[index] && !data[item].isCorrect && data[item].hint}
									{currentAnswers[index] && data[item].isCorrect && ""}
									{!currentAnswers[index] && data[item].isCorrect && data[item].hint}{" "}
								</strong>
							))}

							<strong>
								{isEqual(correctAnswers, currentAnswers)
									? "Congrats! Time to move on to the next lesson!"
									: "Try Again."}
							</strong>
						</p>
					</div>
				)}
			</Form>
		</>
	);
}
