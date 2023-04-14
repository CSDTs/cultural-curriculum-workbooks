import { useRef } from "react";

import { Paragraph, Video } from "@/components/atoms";
import { NoResponse } from "@/components/organisms/responses";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import DrivingVideo from "@/assets/aikr/drive.mp4";
import LawyerVideo from "@/assets/aikr/lawyer.mp4";
import MusicianVideo from "@/assets/aikr/prompt.mp4";
import WebVideo from "@/assets/aikr/website.mp4";

const ExamplesOfReplacement = () => {
	const musicianRef = useRef();
	const lawyerRef = useRef();
	const webRef = useRef();
	const drivingRef = useRef();

	const stopAllPlayback = () => {
		[musicianRef, lawyerRef, webRef, drivingRef].map((vid) => {
			vid.current.plyr.stop();
		});
	};
	return (
		<NoResponse>
			<Paragraph>
				OK, let's explore the issue of people replacement a bit. Pick one or more of these to see how AI, robots and
				other automation may affect this profession. Select on each of the tabs to see.
			</Paragraph>
			<Tabs mt={5} size="lg">
				<TabList>
					<Tab onClick={stopAllPlayback}>Musician</Tab>
					<Tab onClick={stopAllPlayback}>Lawyer</Tab>
					<Tab onClick={stopAllPlayback}>Website Designer</Tab>
					<Tab onClick={stopAllPlayback}>Driving Services</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p className="my-5">
							We like to think of music as pure human creativity, but AI can now analyze thousands of songs and generate
							new ones based on that data:
						</p>

						<Video ref={musicianRef} src={MusicianVideo} alt="Musician Example of Replacement" />
					</TabPanel>
					<TabPanel>
						<p className="my-5">
							While we may still need lawyers, the numbers will likely be reduced: research shows that automation can do
							much of their work. And even judges are using AI for pre-trial recommendations
						</p>

						<Video ref={lawyerRef} src={LawyerVideo} alt="Lawyer Example of Replacement" />
					</TabPanel>
					<TabPanel>
						<p className="my-5">
							If you thought going into computing would keep your job safe from automation, think again. This failed
							example from 2014 showed that AI-powered web design will be harder than it looks, but that does not mean
							it's safe forever:
						</p>
						<Video ref={webRef} src={WebVideo} alt="Web Designer Example of Replacement" />
					</TabPanel>{" "}
					<TabPanel>
						<p className="my-5">
							Obviously any repetitive manual labor job--assembly line workers for example--will be impacted. But
							driving has over 10 million workers in trucking alone:{" "}
						</p>
						<Video ref={drivingRef} src={DrivingVideo} alt="Driving Services Example of Replacement" />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</NoResponse>
	);
};
export default ExamplesOfReplacement;
