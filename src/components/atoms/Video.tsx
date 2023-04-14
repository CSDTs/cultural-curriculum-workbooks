import Plyr, { APITypes, PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import { FC, Ref, forwardRef } from "react";
interface VideoProps {
	src: string;
	alt: string;
}

const sourceProps = ({ src, alt }: VideoProps) => {
	return {
		source: {
			type: "video",
			title: alt,
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

const Video = forwardRef((props: VideoProps, ref: Ref<APITypes>) => {
	const videoProps = sourceProps(props) as PlyrProps;
	return <Plyr ref={ref} {...videoProps} />;
});

export default Video;
