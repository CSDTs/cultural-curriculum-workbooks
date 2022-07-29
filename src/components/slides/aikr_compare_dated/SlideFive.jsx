import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
	updateMiscResponse,
	goToNextLesson,
} from "/src/slices/workbookSlice.js";
import { Form, Button } from "react-bootstrap";
import { CreateLunchOptions } from "../aikr_compare/index";
import styles from "./Slides.module.scss";

export default function SlideFive() {
	const dispatch = useDispatch();

	const currentMisc = useSelector((state) => state.workbookState.data.misc);

	const updateLunchParams = (value, key) => {
		let temp = {
			[key]: value,
		};

		dispatch(updateMiscResponse(temp));
		dispatch(updateResponse("Params set in misc"));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	useEffect(() => {
		if (currentMisc.classASet) document.querySelector(`#${currentMisc.classASet}-checkbox`).checked = true;
		if (currentMisc.classACount) document.querySelector(`#classACount-input`).value = currentMisc.classACount;

		if (currentMisc.classBSet) document.querySelector(`#${currentMisc.classBSet}-checkbox`).checked = true;
		if (currentMisc.classBCount) document.querySelector(`#classACount-input`).value = currentMisc.classBCount;
	}, []);

	const homeParams = [
		{ type: "homeHome", label: "Dimmer Lighting" },
		{ type: "homeOutside", label: "Brighter Lighting" },
		{ type: "homeCafeteria", label: "With Square Surfaces" },
	];

	const factoryParams = [
		{ type: "factoryHome", label: "Dimmer Lighting" },
		{ type: "factoryOutside", label: "Brighter Lighting" },
		{ type: "factoryCafeteria", label: "With Square Surfaces" },
	];
	return (
		<>
			<p>
				Now that you have a solid understanding of a few AI classification concepts, let's get interactive! Our favorite
				school cafeteria worker, Chef Joe, is in danger of being put out of work by factory made lunches. Your cell
				phone app will be used by students to help them buy only Joe's delicious hand-made lunches. So your first step
				is to train the AI on the two classes of images: authentic hand-made versus factory-produced imitations.
			</p>
			<p>
				On this page we want our classifier that detects homemade meals to perform better than the other classifier made
				by a big data company. The other classifier suffers from many of the issues to watch out about, like spurious
				correlation, … and its important create a classifier that actually works well for students.
			</p>
			<p>
				To do this, try selecting what number of real and fake images you'll use. For each category check where you want
				to sample images from: in the cafeteria, outside and/or at home. We'll help you train it and compare it against
				the other classifier.
			</p>

			<section className="row mt-4 justify-content-around">
				<div className="col-md-3">
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>How many home made?</Form.Label>

							<Form.Control
								type="number"
								defaultValue="0"
								className="w-100"
								max="10"
								min="0"
								id={`classACount-input`}
								onChange={(e) => {
									updateLunchParams(e.target.value, "classACount");
								}}
							/>
						</Form.Group>
						<Form.Group className="mb-3 ">
							<Form.Label>Where to take these images from?</Form.Label>
							{homeParams.map((opt) => (
								<div key={`${opt.type}-checkbox`} className="mb-3 d-inline">
									<Form.Check
										inline
										type="checkbox"
										id={`${opt.type}-checkbox`}
										label={opt.label}
										value={opt.type}
										onClick={(e) => updateLunchParams(e.target.value, "classASet")}
									/>
								</div>
							))}
						</Form.Group>
					</Form>
				</div>
				<div className="col-md-3">
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>How many factory made?</Form.Label>

							<Form.Control
								type="number"
								defaultValue="0"
								className="w-100"
								max="10"
								min="0"
								id={`classBCount-input`}
								onChange={(e) => {
									updateLunchParams(e.target.value, "classBCount");
								}}
							/>
						</Form.Group>
						<Form.Group className="mb-3 ">
							<Form.Label>Where to take these images from?</Form.Label>
							{factoryParams.map((opt) => (
								<div key={`${opt.type}-checkbox`} className="mb-3 d-inline">
									<Form.Check
										inline
										type="checkbox"
										id={`${opt.type}-checkbox`}
										label={opt.label}
										value={opt.type}
										onClick={(e) => updateLunchParams(e.target.value, "classBSet")}
									/>
								</div>
							))}
						</Form.Group>
					</Form>
				</div>
			</section>
			<div className="justify-content-center w-100">
				<Button
					variant="primary"
					type="submit"
					className="mt-5 mx-auto d-flex "
					onClick={() => dispatch(goToNextLesson())}>
					Head to Joe's Lunch
				</Button>
			</div>
		</>
	);
}
