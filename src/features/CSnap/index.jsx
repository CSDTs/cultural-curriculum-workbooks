import { useEffect } from "react";
import styles from "./CSnap.module.scss";
import { useSelector, useDispatch } from "react-redux";

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
			console.log(urlPath);
			loadProjectXML(urlPath);
		}
	}, [urlPath, project]);

	return <iframe className={`w-100 shadow ${styles.csnapFrame}`} src="/static/csnap_pro/csdt/snap.html"></iframe>;
}
