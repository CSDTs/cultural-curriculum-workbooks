import MoreInfoExamples from "#features/Response/MoreInfoExamples";
import TextResponse from "#features/Response/TextResponse";

import { slideTwoExamples } from "../aikr_compare/data";
import { STATIC_URL } from "../aikr_compare/index";

export default function SlideTwo() {
	return (
		<>
			<p>
				A problem that can be divided into two kinds of categories is called a “binary classification” problem. Once we
				have two categories we can start collecting data.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Find examples of images in both categories.</h4>

					<p>
						The more examples, the better it will be able to generalize and find the common features across all examples
						in one category. But we set aside some images to use in validation, so we can see if it recognizes an image
						it never saw before.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}image_select.png`} className="img-fluid col-12" />
					</div>
				</div>
				<div className="col-md-8">
					<MoreInfoExamples title={"Some examples of real vs fake"} data={slideTwoExamples} type={"images"} />

					<TextResponse
						title={"What real vs fake problem would you work on if you could?"}
						placeholder={"Some examples of real vs fake problems I could work on would be...."}
						isRequired={true}
					/>
				</div>
			</section>
		</>
	);
}
