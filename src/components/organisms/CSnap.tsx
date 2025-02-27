import useLesson from "@/hooks/useLesson";
import useWorkbook from "@/hooks/useWorkbook";
import { Lesson } from "@/types";
import { FC, useEffect } from "react";
interface CSnapProps {
	project: string;
}

const CSnap: FC<CSnapProps> = ({ project }) => {
	const { current } = useLesson();

	const lesson: Lesson = current;

	const urlPath = (import.meta.env.PROD ? "/workbooks/" : "") + `${project ? project : lesson?.project}`;

	console.log(urlPath);
	let loadProjectXML = (urlPath: string) => {
		if (lesson?.tags?.includes("csnap") || project) {
			fetch(urlPath)
				.then((response) => response.text())
				.then((data) => {
					let iframe = document.querySelector("iframe");
					let world = iframe?.contentWindow?.world;

					if (world != undefined) {
						let ide = world.children[0];
						ide.loadCustomXML(data);
					} else {
						let checkForWorld = setInterval(function () {
							let iframe = document.querySelector("iframe");
							let world = iframe?.contentWindow?.world;
							let ide = world.children[0];
							if (ide != undefined) {
								ide.loadCustomXML(data);
								clearInterval(checkForWorld);
							}
						}, 1000);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
	useEffect(() => {
		if (lesson?.tags?.includes("csnap") || project) {
			loadProjectXML(urlPath);
		}
	}, [urlPath, project]);

	return <iframe src="/csnap_pro/csdt/snap.html" title="CSnap" className="w-full aspect-[1.618] shadow-lg" />;
};

export default CSnap;
