import MoreInfoExamples from "#features/Response/MoreInfoExamples";
import TextResponse from "#features/Response/TextResponse";
import { useState, useEffect } from "react";
import { slideOneExamples } from "./data";
import { STATIC_URL } from "./index";
import CSnap from "#features/CSnap";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";
import ImageCard from "#components/ui/Card/ImageCard";
export default function SectionThreeC() {
	const [project, setProject] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);
	return (
		<>
			{project == "" && <p>Select on one of the available versions of our Neural Style Transfer tool to start: </p>}
			{project != "" && (
				<Button variant="info" size="sm" className="mb-3" onClick={() => setProject("")}>
					Reselect difficulty level
				</Button>
			)}

			<Container hidden={project != ""}>
				<Row>
					<Col style={{ textAlign: "center" }} onClick={() => setProject("xmls/aikr/art_basic.xml")}>
						<ImageCard image={"img/aikr_compare/beginner-art.png"} title={"Beginner"} />
					</Col>
					<Col style={{ textAlign: "center" }} onClick={() => setProject("xmls/aikr/art_intermediate.xml")}>
						<ImageCard image={"img/aikr_compare/intermediate-art.png"} title={"Intermediate"} />
					</Col>
					<Col style={{ textAlign: "center" }} onClick={() => setProject("xmls/aikr/art_advanced.xml")}>
						<ImageCard image={"img/aikr_compare/advanced-art.png"} title={"Advanced"} />
					</Col>
				</Row>
			</Container>

			<section hidden={project == ""}>
				<CSnap project={project} />
			</section>
		</>
	);
}
// project={"xmls/aikr/art_basic.xml"}
