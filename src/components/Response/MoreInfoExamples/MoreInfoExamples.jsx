import { Popover, OverlayTrigger } from "react-bootstrap";
import { FaQuestionCircle } from "react-icons/fa";

const STATIC_URL = "./img/aikr_compare/";

const createPopover = (data, type) => {
	return (
		<Popover id={`popover-${data.slug}`}>
			<Popover.Header as="h3">{data.title}</Popover.Header>
			{type == "basic" && (
				<Popover.Body>
					{data.body} <a href={data.readMoreLink}>{data.readMoreText}</a>
				</Popover.Body>
			)}
			{type == "images" && (
				<Popover.Body>
					<span className="mb-3 d-block">{data.body}</span>
					<div className="row justify-content-center mb-4">
						<img src={`${STATIC_URL}${data.img_a}`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}${data.img_b}`} className="img-fluid col-md-6" />
					</div>
				</Popover.Body>
			)}
		</Popover>
	);
};

const createListItem = (data, type) => {
	let popover = createPopover(data, type);

	return (
		<OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
			<span>
				{data.title}
				<FaQuestionCircle className="mx-2 mb-2" />
			</span>
		</OverlayTrigger>
	);
};

export default function MoreInfoExamples({ title, description, data, type }) {
	return (
		<>
			<h4>{title || "Some examples"}</h4>
			<p>{description || ""}</p>
			<ul>
				{data.map((explainer) => (
					<li>{createListItem(explainer, type)}</li>
				))}
			</ul>
		</>
	);
}
