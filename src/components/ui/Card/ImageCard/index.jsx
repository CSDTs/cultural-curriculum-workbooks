import styles from "./ImageCard.module.scss";

export default function ImageCard({ image, title }) {
	return (
		<figure>
			<a>
				<img src={image} />

				<figcaption>{title}</figcaption>
			</a>
		</figure>
	);
}
