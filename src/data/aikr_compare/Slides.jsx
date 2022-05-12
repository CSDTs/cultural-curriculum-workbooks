import React from "react";
import { Form } from "react-bootstrap";

const STATIC_URL = "./src/data/aikr_compare/img/";

function SlideOne() {
	return (
		<React.Fragment>
			<p>
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</p>

			<p>
				Let's start learning about the first step: deciding on a problem. Deciding on a problem starts your
				classification journey that will end in making your own AI project.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Decide on a problem</h4>

					<p>
						Because we are looking at real vs fake, you want an example where that difference actually matters. We will
						train the AI to decide if a given image is in the "real" category or "fake" category.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}real_grapes.png`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}fake_grapes.png`} className="img-fluid col-md-6" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Some examples</h4>

					<ul>
						<li>Counterfeit Malaria Medicine</li>
						<li>Stealing in Video Games</li>
						<li>Lunches that are Homemade or Factory Made</li>
					</ul>

					<h4 className="mt-5">What is a problem where visual difference is important?</h4>
					<textarea placeholder="*optional" className="form-control"></textarea>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<Form>
						{[
							{ type: "energy", label: "Excessive energy use" },
							{ type: "weight", label: "The range of baby weights" },
							{ type: "noise", label: "Noisy neighbors" },
						].map((opt) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check type="checkbox" id={`${opt.type}-checkbox`} label={`${opt.label}`} />
							</div>
						))}
					</Form>
				</div>
			</section>
		</React.Fragment>
	);
}

function SlideTwo() {
	return (
		<p>
			To make a problem a "binary classification" one, we have to think about ways the problem can be divided into two
			categories. Once we have two categories, we can start collecting data for each category.
		</p>
	);
}

function SlideThree() {
	return (
		<p>
			With a fake and real dataset, we can use AI to help tell the difference between each category. Sometimes, AI will
			pick up on unexpected similarities within a category to tell the difference and it won't work as well on real life
			examples. To validate an AI model, we see how it does on examples it has never seen before. How it can be measured
			by its "sureness" and whether it was right or not.
		</p>
	);
}

export default function Slides(props) {
	console.log(props);
	const CONCEPT_CHECK_ANSWER = "";
	const SLIDE_ARRAY = [SlideOne, SlideTwo, SlideThree];
	let content = SLIDE_ARRAY[props.slideID]();

	return <section>{content}</section>;
}
