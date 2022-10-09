import { useEffect } from "react";

import { AspectRatio } from "@chakra-ui/react";
import { useRef } from "react";

import useResponse from "/src/common/hooks/useResponse";

export default function JoesLunch() {
	const { updateNormal } = useResponse();
	const iframe = useRef();
	const url_string = "./build/index.html" + `?embedded=true&`;

	useEffect(() => {
		updateNormal();
	}, []);

	return (
		<AspectRatio ratio={1.618}>
			<iframe ref={iframe} src={url_string} title="Joes Lunch"></iframe>
		</AspectRatio>
	);
}
