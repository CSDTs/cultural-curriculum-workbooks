import TextResponse from "#features/Response/TextResponse";

import { Container, Row, Col } from "react-bootstrap";

export default function SlideThree() {
	return (
		<>
			{/* <Container>
				<Row className="justify-content-md-center">
					<Col md="auto"> */}
			<img src="./img/ai_labor/graph.png" className="mb-4" />
			{/* </Col>
				</Row>
			</Container> */}
			<p>
				Studies by economists like Sylvain Leduc show that even when there are replacement jobs -- more people in
				“personal touch” industries like hosting or customer service--automation causes the percentage of profits going
				to labor to decline. This means more wealth inequality. As of October 2021, the richest 10% of the US own almost
				90% of the wealth.
			</p>

			<p>
				Economists Epp and Borghett compared wealth inequality effects in different countries. They found that high
				inequality correlates with fewer programs for health care, unemployment, pensions, workforce development, labour
				unions, and public housing. They suggest this is not by accident: “economic elites constrain the scope of
				decision-making by crowding out certain policies from the agendas of policymakers.” In other words, the rich get
				richer, not because that’s how technology has to work, but only because we allow it to do that.
			</p>

			<section className="row mt-4">
				<div className="col-md-8">
					<TextResponse
						title={"What would you say this graph is trying to show?"}
						placeholder={"This graph shows that..."}
						isRequired={true}
					/>
				</div>
			</section>
		</>
	);
}
