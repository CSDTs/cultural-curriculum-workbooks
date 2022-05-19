import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";
import SlideFour from "./SlideFour";
import SlideFive from "./SlideFive";
import SlideSix from "./SlideSix";
import SlideSeven from "./SlideSeven";
export default function Slides(props) {
	const CONCEPT_CHECK_ANSWER = "";
	const SLIDE_ARRAY = [SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, SlideSix, SlideSeven];

	let Content = SLIDE_ARRAY[props.slideID];

	return (
		<section>
			<Content />
		</section>
	);
}
