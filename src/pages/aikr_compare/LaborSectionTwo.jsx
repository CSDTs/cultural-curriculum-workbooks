import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEarnedPoints, updateResponse, updateSaveStatus } from "/src/slices/workbookSlice.js";

import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import styles from "./Slides.module.scss";
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
					src: "img/ai_labor/Untitled.mp4",
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
			<Tabs mt={5} size="lg">
				<TabList>
					<Tab>Musician</Tab>
					<Tab>Lawyer</Tab>
					<Tab>Website Designer</Tab>
					<Tab>Driving Services</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p>
							We like to think of music as pure human creativity, but AI can now analyze thousands of songs and generate
							new ones based on that data:
						</p>

						<Plyr {...musicianProps} />
					</TabPanel>
					<TabPanel>
						<p>
							While we may still need lawyers, the numbers will likely be reduced: research shows that automation can do
							much of their work. And even judges are using AI for pre-trial recommendations
						</p>
						<Plyr {...lawyerProps} />
					</TabPanel>
					<TabPanel>
						<p>
							If you thought going into computing would keep your job safe from automation, think again. This failed
							example from 2014 showed that AI-powered web design will be harder than it looks, but that does not mean
							it's safe forever:
						</p>

						<Plyr {...webProps} />
					</TabPanel>{" "}
					<TabPanel>
						<p>
							Obviously any repetitive manual labor job--assembly line workers for example--will be impacted. But
							driving has over 10 million workers in trucking alone:{" "}
						</p>
						<Plyr {...drivingProps} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
}
