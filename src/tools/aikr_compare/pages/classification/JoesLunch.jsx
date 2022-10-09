import { AspectRatio, VisuallyHidden } from "@chakra-ui/react";

import { NoResponse } from "/src/common/features/responses";

export default function JoesLunch() {
	const url_string = "./build/index.html" + `?embedded=true&`;

	return (
		<NoResponse>
			<VisuallyHidden>Joe's Lunch </VisuallyHidden>
			<AspectRatio ratio={1.618}>
				<iframe src={url_string} title="Joes Lunch"></iframe>
			</AspectRatio>
		</NoResponse>
	);
}
