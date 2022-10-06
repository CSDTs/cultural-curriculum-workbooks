import CSnap from "#features/CSnap";

import { Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { SoftwareSelectionCard } from "../../components/cards";

import { updateEarnedPoints, updateResponse, updateSaveStatus } from "/src/slices/workbookSlice.js";
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
				<Button size="sm" className="mb-3" onClick={() => setProject("")}>
					Reselect difficulty level
				</Button>
			)}

			<SimpleGrid columns={3} spacing={10} hidden={project != ""}>
				<SoftwareSelectionCard
					image={"img/aikr_compare/beginner-art.png"}
					title={"Beginner"}
					handleOnClick={() => setProject("xmls/aikr/art_basic.xml")}
				/>

				<SoftwareSelectionCard
					image={"img/aikr_compare/intermediate-art.png"}
					title={"Intermediate"}
					handleOnClick={() => setProject("xmls/aikr/art_intermediate.xml")}
				/>

				<SoftwareSelectionCard
					image={"img/aikr_compare/advanced-art.png"}
					title={"Advanced"}
					handleOnClick={() => setProject("xmls/aikr/art_advanced.xml")}
				/>
			</SimpleGrid>

			<section hidden={project == ""}>
				<CSnap project={project} />
			</section>
		</>
	);
}
