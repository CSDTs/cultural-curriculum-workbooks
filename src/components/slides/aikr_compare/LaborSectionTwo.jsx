import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";

import styles from "./Slides.module.scss";
import { FaPlay } from "react-icons/fa";
import { Tabs, Tab, Container } from "react-bootstrap";
export default function SlideTwo() {
	const dispatch = useDispatch();

	const musicianProps = {
		source: {
			type: "video",
			title: "Musician Example",
			sources: [
				{
					src: "img/ai_labor/prompt.mp4",
					type: "video/mp4",
					size: 720,
				},
			],
		},
		options: {
			controls: [
				"play-large",
				"play",
				"progress",
				"current-time",
				"mute",
				"volume",
				"captions",
				"settings",
				"pip",
				"airplay",
				"fullscreen",
			],
		},
	};
	const lawyerProps = {
		source: {
			type: "video",
			title: "Musician Example",
			sources: [
				{
					src: "img/ai_labor/law.mp4",
					type: "video/mp4",
					size: 720,
				},
			],
		},
		options: {
			controls: [
				"play-large",
				"play",
				"progress",
				"current-time",
				"mute",
				"volume",
				"captions",
				"settings",
				"pip",
				"airplay",
				"fullscreen",
			],
		},
	};

	const webProps = {
		source: {
			type: "video",
			title: "Musician Example",
			sources: [
				{
					src: "img/ai_labor/website.mp4",
					type: "video/mp4",
					size: 720,
				},
			],
		},
		options: {
			controls: [
				"play-large",
				"play",
				"progress",
				"current-time",
				"mute",
				"volume",
				"captions",
				"settings",
				"pip",
				"airplay",
				"fullscreen",
			],
		},
	};

	const drivingProps = {
		source: {
			type: "video",
			title: "Musician Example",
			sources: [
				{
					src: "img/ai_labor/drive.mp4",
					type: "video/mp4",
					size: 720,
				},
			],
		},
		options: {
			controls: [
				"play-large",
				"play",
				"progress",
				"current-time",
				"mute",
				"volume",
				"captions",
				"settings",
				"pip",
				"airplay",
				"fullscreen",
			],
		},
	};

	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);

	return (
		<>
			<p>
				OK, let's explore the issue of people replacement a bit. Pick one or more of these to see how AI, robots and
				other automation may affect this profession. Select on each of the tabs to see.
			</p>

			<Container>
				<Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
					<Tab eventKey="home" title="Musician">
						<p>
							We like to think of music as pure human creativity, but AI can now analyze thousands of songs and generate
							new ones based on that data:
						</p>

						<Plyr {...musicianProps} />
						<div className="ratio ratio-16x9"></div>
					</Tab>
					<Tab eventKey="profile" title="Lawyer">
						<p>
							While we may still need lawyers, the numbers will likely be reduced: research shows that automation can do
							much of their work. And even judges are using AI for pre-trial recommendations
						</p>
						<Plyr {...lawyerProps} />
					</Tab>
					<Tab eventKey="longer-tab" title="Website Designer">
						<p>
							If you thought going into computing would keep your job safe from automation, think again. This failed
							example from 2014 showed that AI-powered web design will be harder than it looks, but that does not mean
							it's safe forever:
						</p>

						<Plyr {...webProps} />
					</Tab>
					<Tab eventKey="contact" title="Driving Services">
						<p>
							Obviously any repetitive manual labor job--assembly line workers for example--will be impacted. But
							driving has over 10 million workers in trucking alone:{" "}
						</p>
						<Plyr {...drivingProps} />
					</Tab>
				</Tabs>
			</Container>
		</>
	);
}
