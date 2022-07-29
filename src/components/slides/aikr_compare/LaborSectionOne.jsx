import TextResponse from "#features/Response/TextResponse";

export default function SlideOne() {
	return (
		<>
			<img className="mb-4" src="./img/ai_labor/intro.png" />
			<p>
				AI, robotics and other automation are some of the hottest tech in town. But with great power comes great
				responsibility. What kinds of jobs might end up with machines replacing people, or other kinds of changes? What
				sorts of problems should we look for?
			</p>

			<section className="row mt-4">
				<div className="col-md-8">
					<TextResponse title={" Write your answer here:"} placeholder={"We should look for..."} isRequired={true} />
				</div>
			</section>
		</>
	);
}
