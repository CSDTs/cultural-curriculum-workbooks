import { AspectRatio } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CSnap.module.scss";

export default function CSnap({ project }) {
	const lesson = useSelector((state) => state.workbookState.workbook.current_lesson);
	const urlPath = `${import.meta.env.PROD ? "/static/workbooks/" : ""}${project ? project : lesson?.project}`;

	let loadProjectXML = (urlPath) => {
		if (lesson?.tags?.includes("csnap") || project) {
			fetch(urlPath)
				.then((response) => response.text())
				.then((data) => {
					let iframe = document.querySelector("iframe");
					let world = iframe.contentWindow.world;

					if (world != undefined) {
						let ide = world.children[0];
						ide.loadCustomXML(data);
					} else {
						let checkForWorld = setInterval(function () {
							let iframe = document.querySelector("iframe");
							let world = iframe.contentWindow.world;
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
			// console.log(urlPath);
			loadProjectXML(urlPath);
		}
	}, [urlPath, project]);

	return (
		<AspectRatio ratio={1.618} shadow={"base"}>
			<iframe src="/static/csnap_pro/csdt/snap.html"></iframe>
		</AspectRatio>
	);
}
