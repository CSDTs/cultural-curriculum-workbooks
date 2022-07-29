import TextResponse from "#features/Response/TextResponse";
import { STATIC_URL } from "./index";

export default function CompareSectionThree() {
	return (
		<>
			<p>
				With a dataset of “fakes” and “reals” we can use AI to help tell the difference between each category. To
				validate an AI model we see how it does on examples it has never seen before. We measure this with its
				confidence level or “sureness”.
			</p>
			<p>
				Sometimes AI will pick up on unexpected similarities within a category to tell the difference and it won’t work
				as well on real life examples. These are called “spurious correlations”. Suppose every fake is photographed on a
				store shelf, and all the reals are in baskets. Now when it comes across a fake in a basket, it might categorize
				it as real.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Validate your model</h4>

					<p>
						Provide an image it has never seen before, and test to find out if it classifies it correctly. Do that a few
						times with different target images, and you can gain more evidence that your AI app is a success.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}validate_model.png`} className="img-fluid col-md-12" />
					</div>
				</div>
				<div className="col-md-8">
					<p>If validation shows poor performance, check for spurious correlations</p>
					<p>
						What do you think the spurious correlation might be in this case? A study of jail sentence algorithms showed
						longer sentences for African American citizens convicted of the same crime as white citizens. The
						information it collected includes: neighborhood, job history, incarceration history of family and
						associates, education level.
					</p>
					<TextResponse
						title={"Your answer: "}
						placeholder={"I think the spurious correlation in this case could be..."}
						isRequired={true}
					/>
				</div>
			</section>
		</>
	);
}
