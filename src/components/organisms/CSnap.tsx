import useLesson from "@/hooks/useLesson";
import useWorkbook from "@/hooks/useWorkbook";
import { Lesson } from "@/types";
import { FC, useEffect, useRef } from "react";
interface CSnapProps {
	project: string;
}

const CSnap: FC<CSnapProps> = ({ project }) => {
	const { current } = useLesson();

	const lesson: Lesson = current;

	const workbooksBase = import.meta.env.VITE_WORKBOOKS_BASE || "";
	const urlPath = (workbooksBase ? workbooksBase + "/" : "") + `${project ? project : lesson?.project}`;

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
						intervalRef.current = setInterval(function () {
							let iframe = document.querySelector("iframe");
							let world = iframe?.contentWindow?.world;
							if (typeof world === "undefined" || !world) return;
							let ide = world.children[0];
							if (ide != undefined) {
								ide.loadCustomXML(data);
								if (intervalRef.current) clearInterval(intervalRef.current);
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

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [urlPath, project]);

	return (
		<iframe
			src={`${import.meta.env.VITE_CSNAP_BASE_URL}/index.html`}
			title="CSnap"
			className="w-full aspect-[1.618] shadow-lg"
		/>
	);
};

export default CSnap;
