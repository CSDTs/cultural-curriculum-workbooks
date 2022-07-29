import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { Alert } from "react-bootstrap";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";
const blockInfo = {
	costume: `This block allows you to set a base and a style image based on costumes attached to the project. We have a variety of different images for you to experiment with.`,
	create: `This block calls the AI model to train and transfer qualities of the style image onto the base image, creating something new. You can enable downloads as well as customize the transfer using advanced options (controlling size, quality, and strength)`,
	stamp: `This block allows you to stamp your newly created image onto the stage.`,
	attribute:
		"This block allows you to programmatically set the size and style strength (stylization ratio) of your base and style images. ",
	quality:
		"This block allows you to programmatically set the quality of your final NST image. High quality images tend to take way longer than fast, but have better quality than fast.",
};

export default function SectionTwoC() {
	const [info, setInfo] = useState("");

	const handleClick = (e) => {
		setInfo(blockInfo[e]);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);
	return (
		<>
			<p>
				To help you with our Neural Style Transfer tool, we have the blocks that you will be using below. Click to see
				what each block does:
			</p>

			<section className="row mt-5 justify-content-around ">
				<div className="col-md-4">
					<img src="img/aikr_compare/csnap/usecostume.png" onClick={() => handleClick("costume")} /> <br />
					<img src="img/aikr_compare/csnap/createNST.png" onClick={() => handleClick("create")} />
					<br />
					<img src="img/aikr_compare/csnap/stampNST.png" onClick={() => handleClick("stamp")} />
					<img src="img/aikr_compare/csnap/setAttribute.png" onClick={() => handleClick("attribute")} />
					<img src="img/aikr_compare/csnap/setQuality.png" onClick={() => handleClick("quality")} />
				</div>
				<div className="col-md-4 align-self-center">
					<Alert variant={"light"}>
						<p>{info}</p>
					</Alert>
				</div>
			</section>
		</>
	);
}
