import { useEffect } from "react";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";

import { STATIC_URL } from "./index";
import { useDispatch } from "react-redux";
export default function CompareSectionTwo() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);

	return (
		<>
			<p>
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</p>

			<p>Let's start learning about the first step: deciding on a problem.</p>

			<p>
				A problem that can be divided into two kinds of categories is called a “binary classification” problem. Once we
				have two categories we can start collecting data.
			</p>

			<section className="row mt-5 justify-content-around">
				<div className="col-md-4">
					<h4>Decide on a problem</h4>

					<p>
						First you need a case where “real” vs “fake” actually matters. Then we will train the AI to decide if a
						given image is in the "real" category or "fake" category. In AI, this is known as a classification problem,
						and they would say our case has two categories or "binary classification".
					</p>

					<div className="row">
						<img src={`${STATIC_URL}real_grapes.png`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}fake_grapes.png`} className="img-fluid col-md-6" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Find examples of images in both categories.</h4>

					<p>
						The next step is finding examples of images in both categories. The more examples, the better it will be
						able to generalize and find the common features across all examples in one category. But we set aside some
						images to use in validation, so we can see if it recognizes an image it never saw before.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}image_select.png`} className="img-fluid col-12" />
					</div>
				</div>
			</section>
		</>
	);
}
