import CSnap from "/src/common/features/CSnap";

import { Button, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import { SoftwareCard } from "/src/common/ui/cards";

import { Box } from "@chakra-ui/react";
import { NoResponse } from "/src/common/features/responses";

import { P } from "/src/common/core";

import AdvancedImg from "/src/assets/aikr/advanced-art.png";
import BeginnerImg from "/src/assets/aikr/beginner-art.png";
import IntermediateImg from "/src/assets/aikr/intermediate-art.png";

export default function NeuralStyleTransfer() {
	const [project, setProject] = useState("");

	const setBeginner = () => setProject("xmls/aikr/art_basic.xml");
	const setIntermediate = () => setProject("xmls/aikr/art_intermediate.xml");
	const setAdvanced = () => setProject("xmls/aikr/art_advanced.xml");
	const reset = () => setProject("");

	return (
		<NoResponse>
			{project == "" && <P>Select on one of the available versions of our Neural Style Transfer tool to start: </P>}
			{project != "" && (
				<Button size="sm" className="mb-3" onClick={reset} mb={5}>
					Reselect difficulty level
				</Button>
			)}

			<SimpleGrid columns={3} spacing={10} hidden={project != ""}>
				<SoftwareCard image={BeginnerImg} title={"Beginner"} handleOnClick={setBeginner} />
				<SoftwareCard image={IntermediateImg} title={"Intermediate"} handleOnClick={setIntermediate} />
				<SoftwareCard image={AdvancedImg} title={"Advanced"} handleOnClick={setAdvanced} />
			</SimpleGrid>

			<Box hidden={project == ""}>
				<CSnap project={project} />
			</Box>
		</NoResponse>
	);
}
