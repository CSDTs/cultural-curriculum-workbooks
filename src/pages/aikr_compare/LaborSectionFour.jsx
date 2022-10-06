import TextResponse from "#features/Response/TextResponse";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
export default function SlideFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	return (
		<>
			<p>Knowing what you know now, how does this change the answer you gave before?</p>
			<p>Before, you wrote:</p>
			<Alert key="secondary" variant="secondary">
				{data?.responses[0]?.response ? data.responses[0].response : data.responses[0]}
			</Alert>

			<p>
				Now that you had time to think about it more, what else can you say about the jobs that might be impacted, or
				what challenges we should look for?
			</p>
			<section className="row ">
				<div className="col-md-8">
					<TextResponse title={" Write your answer here:"} placeholder={"We should look for..."} isRequired={true} />
				</div>
			</section>
		</>
	);
}
