import React from "react";
import { motion } from "framer-motion";
export default function Application(props) {
	const backgroundURL = (slug) => {
		return `/culture/${slug}/index.html`;
	};
	return (
		<motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} className="card">
			<a href={backgroundURL(props.slug)}>
				<img src={props.thumbnail} alt="" className={`card-top app-img`} />
				<div className="card-body">
					<div className="card-title">
						<h6>{props.name}</h6>
					</div>
				</div>
			</a>
		</motion.div>
	);
}
