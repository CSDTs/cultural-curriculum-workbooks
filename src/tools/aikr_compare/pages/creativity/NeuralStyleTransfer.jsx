import CSnap from "/src/common/features/CSnap";

import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { SoftwareSelectionCard } from "/src/common/ui/cards";

import useResponse from "/src/common/hooks/useResponse";
export default function NeuralStyleTransfer() {
	const [project, setProject] = useState("");

	const { updateNormal } = useResponse();
	const textStyle = {
		mb: 5,
		textAlign: {
			base: "center",
			sm: "left",
		},
		color: "gray.600",
		_dark: {
			color: "gray.400",
		},
		fontSize: {
			md: "lg",
		},
	};

	useEffect(() => {
		updateNormal();
	}, []);
	return (
		<>
			{project == "" && (
				<Text {...textStyle}>Select on one of the available versions of our Neural Style Transfer tool to start: </Text>
			)}
			{project != "" && (
				<Button size="sm" className="mb-3" onClick={() => setProject("")} mb={5}>
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
