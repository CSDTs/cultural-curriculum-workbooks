import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useRef } from "react";

import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import { P } from "/src/common/core";
import { NoResponse } from "/src/common/features/responses";

import DrivingVideo from "/src/assets/aikr/drive.mp4";
import LawyerVideo from "/src/assets/aikr/lawyer.mp4";
import MusicianVideo from "/src/assets/aikr/prompt.mp4";
import WebVideo from "/src/assets/aikr/website.mp4";

const sourceProps = (src, title) => {
	return {
		source: {
			type: "video",
			title,
			sources: [
				{
					src,
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
};

export default function ExamplesOfReplacement() {
	const musicianRef = useRef();
	const lawyerRef = useRef();
	const webRef = useRef();
	const drivingRef = useRef();

	const musicianProps = sourceProps(MusicianVideo, "Musician Example of Replacement");
	const lawyerProps = sourceProps(LawyerVideo, "Lawyer Example of Replacement");
	const webProps = sourceProps(WebVideo, "Web Designer Example of Replacement");
	const drivingProps = sourceProps(DrivingVideo, "Driving Services Example of Replacement");

	const stopAllPlayback = () => {
		[musicianRef, lawyerRef, webRef, drivingRef].map((vid) => {
			vid.current.plyr.stop();
		});
	};
	return (
		<NoResponse>
			<P>
				OK, let's explore the issue of people replacement a bit. Pick one or more of these to see how AI, robots and
				other automation may affect this profession. Select on each of the tabs to see.
			</P>
			<Tabs mt={5} size="lg">
				<TabList>
					<Tab onClick={stopAllPlayback}>Musician</Tab>
					<Tab onClick={stopAllPlayback}>Lawyer</Tab>
					<Tab onClick={stopAllPlayback}>Website Designer</Tab>
					<Tab onClick={stopAllPlayback}>Driving Services</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Text my={5}>
							We like to think of music as pure human creativity, but AI can now analyze thousands of songs and generate
							new ones based on that data:
						</Text>
						<Plyr ref={musicianRef} {...musicianProps} />
					</TabPanel>
					<TabPanel>
						<Text my={5}>
							While we may still need lawyers, the numbers will likely be reduced: research shows that automation can do
							much of their work. And even judges are using AI for pre-trial recommendations
						</Text>
						<Plyr ref={lawyerRef} {...lawyerProps} />
					</TabPanel>
					<TabPanel>
						<Text my={5}>
							If you thought going into computing would keep your job safe from automation, think again. This failed
							example from 2014 showed that AI-powered web design will be harder than it looks, but that does not mean
							it's safe forever:
						</Text>
						<Plyr ref={webRef} {...webProps} />
					</TabPanel>{" "}
					<TabPanel>
						<Text my={5}>
							Obviously any repetitive manual labor job--assembly line workers for example--will be impacted. But
							driving has over 10 million workers in trucking alone:{" "}
						</Text>
						<Plyr ref={drivingRef} {...drivingProps} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</NoResponse>
	);
}
