import { useSelector } from "react-redux";

import TextResponse from "#features/Response/TextResponse";

import Alert from "react-bootstrap/Alert";
export default function CompareSectionEight() {
	const data = useSelector((state) => state.workbookState.data);

	return (
		<>
			<p>
				Before you were asked: AI already helps billionaires tell real art from fake art, or real diamonds from fake
				diamonds. But how do you think real vs fake could be applied to help low-income communities?
			</p>
			<Alert key="secondary" variant="secondary">
				{data?.responses[5]?.response ? data.responses[5].response : data.responses[5]}
			</Alert>
			<section className="row mt-1">
				<div className="col-md-8">
					<TextResponse
						title={"Is there anything new that you would add to this?"}
						placeholder={"In addition to what I stated previously, I would add..."}
						isRequired={true}
					/>
				</div>
			</section>
		</>
	);
}
