import CSnap from "@/components/organisms/CSnap";

import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import { SoftwareCard } from "@/components/molecules";

import { NoResponse } from "@/components/organisms/responses";

import { Paragraph } from "@/components/atoms";

import AdvancedImg from "@/assets/aikr/advanced-art.png";
import BeginnerImg from "@/assets/aikr/beginner-art.png";
import IntermediateImg from "@/assets/aikr/intermediate-art.png";

const NeuralStyleTransfer = () => {
	const [project, setProject] = useState("");

	const setBeginner = () => setProject("xmls/aikr/art_basic.xml");
	const setIntermediate = () => setProject("xmls/aikr/art_intermediate.xml");
	const setAdvanced = () => setProject("xmls/aikr/art_advanced.xml");
	const reset = () => setProject("");

	return (
		<NoResponse>
			{project == "" && (
				<Paragraph>Select on one of the available versions of our Neural Style Transfer tool to start: </Paragraph>
			)}
			{project != "" && (
				<button
					className="text-sm mb-3 p-2 rounded bg-slate-800 dark:bg-slate-600 font-semibold hover:bg-opacity-60 dark:hover:bg-opacity-75"
					onClick={reset}>
					Reselect difficulty level
				</button>
			)}

			<SimpleGrid columns={3} spacing={10} hidden={project != ""}>
				<SoftwareCard image={BeginnerImg} title={"Beginner"} handleOnClick={setBeginner} />
				<SoftwareCard image={IntermediateImg} title={"Intermediate"} handleOnClick={setIntermediate} />
				<SoftwareCard image={AdvancedImg} title={"Advanced"} handleOnClick={setAdvanced} />
			</SimpleGrid>

			<div hidden={project == ""}>
				<CSnap project={project} />
			</div>
		</NoResponse>
	);
};
export default NeuralStyleTransfer;
