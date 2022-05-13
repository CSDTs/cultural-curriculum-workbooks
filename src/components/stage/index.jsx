import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";

//Views for workbooks
import VerifyUser from "./VerifyUser";
import Homepage from "./Homepage";

import SaveButtons from "./SaveButtons/SaveButtons";

import styles from "./Stage.module.css";

//This is for any workbooks that have specialized functionality
function loadSlides(name) {
	const Component = React.lazy(() => import(`../../data/aikr_compare/Slides`));
	return Component;
}

export default function Stage() {
	const currentLesson = useSelector((state) => state.counter.value);
	const lesson = useSelector((state) => state.counter.lesson);
	const slug = useSelector((state) => state.counter.slug);
	let SlideComponent;
	if (lesson?.tags?.includes("slide")) SlideComponent = loadSlides(slug);

	const dispatch = useDispatch();

	let loadProjectXML = () => {
		if (lesson?.tags?.includes("csnap")) {
			fetch(lesson.project)
				.then((response) => response.text())
				.then((data) => {
					let iframe = document.querySelector("iframe");
					let world = iframe.contentWindow.world;

					if (world != undefined) {
						let ide = world.children[0];
						ide.loadWorkbookFile(data);
					} else {
						let checkForWorld = setInterval(function () {
							let iframe = document.querySelector("iframe");
							let world = iframe.contentWindow.world;
							let ide = world.children[0];
							if (ide != undefined) {
								ide.loadWorkbookFile(data);
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

	React.useEffect(() => {
		if (lesson?.tags?.includes("csnap")) {
			loadProjectXML();
		}
	});

	return (
		<section className="px-3 mt-3">
			<div className="row justify-content-between align-items-center">
				<div className="col-auto">
					<h4>{lesson.title}</h4>
				</div>

				<SaveButtons />
			</div>

			<hr className={styles.headerDivide} />
			<p
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(lesson.details),
				}}
			/>

			{lesson?.tags?.includes("csnap") && (
				<iframe className={`w-100 shadow ${styles.csnapFrame}`} src="/static/csnap_pro/csdt/snap.html"></iframe>
			)}

			{lesson?.tags?.includes("login") && <VerifyUser />}

			{lesson?.tags?.includes("homepage") && <Homepage />}

			{lesson?.tags?.includes("slide") && (
				<Suspense fallback={<div>Loading ... </div>}>
					<SlideComponent slideID={currentLesson} />
				</Suspense>
			)}
		</section>
	);
}
