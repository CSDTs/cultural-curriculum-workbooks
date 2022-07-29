import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function LastSaved({ date }) {
	return (
		<div>
			<p>
				Last saved: <ReactTimeAgo date={date} locale="en-US" />
			</p>
		</div>
	);
}
