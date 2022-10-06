import CompareSectionOne from "./CompareSectionOne";
import CompareSectionTwo from "./CompareSectionTwo";
import CompareSectionThree from "./CompareSectionThree";
import CompareSectionFour from "./CompareSectionFour";
import CompareSectionFive from "./CompareSectionFive";
import CompareSectionSix from "./CompareSectionSix";
import CompareSectionSeven from "./CompareSectionSeven";
import CompareSectionEight from "./CompareSectionEight";

import LaborSlideOne from "./LaborSectionOne";
import LaborSlideTwo from "./LaborSectionTwo";
import LaborSlideThree from "./LaborSectionThree";
import LaborSlideFour from "./LaborSectionFour";
import LaborSlideFive from "./LaborSectionFive";

import CreativeSectionOne from "./CreativeSectionOne";
import CreativeSectionTwo from "./CreativeSectionTwo";
import CreativeSectionThree from "./CreativeSectionThree";
import CreativeSectionFour from "./CreativeSectionFour";

export const STATIC_URL = "./img/aikr_compare/";

export const CreateWriteUpBasic = ({ title, callback, next, data, show, rows }) => {
	return (
		<div className="col-md-3 align-self-center">
			<p className="mb-0">
				<strong>{title}</strong>
			</p>
			{/* <p className="mt-0">Word Count: {data.response.split(" ").length - 1}</p> */}
			<textarea
				className="form-control"
				rows={rows}
				onChange={(e) => {
					callback(e.target.value, data);
				}}
				placeholder={data.statement}
				value={data.response || data.statement}
			/>

			{/* {data.verified && <p>Good Job!</p>} */}
		</div>
	);
};

export default function Slides(props) {
	const SLIDE_ARRAY = [
		LaborSlideOne,
		LaborSlideTwo,
		LaborSlideThree,
		LaborSlideFour,
		LaborSlideFive,

		CompareSectionOne,
		CompareSectionTwo,
		CompareSectionThree,
		CompareSectionFour,
		CompareSectionFive,
		CompareSectionSix,
		CompareSectionSeven,
		CompareSectionEight,

		CreativeSectionOne,
		CreativeSectionTwo,
		CreativeSectionThree,
		CreativeSectionFour,
	];

	let Content = SLIDE_ARRAY[props.slideID];

	return <Content />;
}
