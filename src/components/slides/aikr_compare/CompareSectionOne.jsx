import TextResponse from "#features/Response/TextResponse";

export default function CompareSectionOne() {
	return (
		<>
			<p>
				Because we are looking at real vs fake, you want an example where that difference actually matters. We will
				train the AI to decide if a given image is in the "real" category or "fake" category.
			</p>

			<section className="row mt-1">
				<div className="col-md-8">
					<h4 style={{ lineHeight: "1.25" }} className="mb-4">
						AI already helps billionaires tell real art from fake art, or real diamonds from fake diamonds. But how do
						you think real vs fake could be applied to help low-income communities?
					</h4>
					<TextResponse
						title={"Write your answer here"}
						placeholder={"Real vs fake could be applied to help low-income communities by..."}
						isRequired={true}
					/>
				</div>
			</section>
		</>
	);
}
