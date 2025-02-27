import { NoResponse } from "@/components/organisms/responses";

const JoesLunch = () => {
	const url_string = "/workbooks/build/index.html" + `?embedded=true&`;

	return (
		<NoResponse>
			<iframe src={url_string} title="Joes Lunch" className="aspect-[1.618] w-full h-full" />
		</NoResponse>
	);
};
export default JoesLunch;
