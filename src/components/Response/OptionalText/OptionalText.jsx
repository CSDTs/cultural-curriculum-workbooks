import styles from "./OptionalText.module.scss";
import { FaCheck } from "react-icons/fa";

export default function OptionalText({ title, placeholder, callback, currentValue, rows }) {
	return (
		<>
			<h4 className="mt-5">
				{currentValue && <FaCheck className={styles.correct} />} {title}
			</h4>
			<textarea
				placeholder={placeholder || "*optional"}
				className="form-control"
				onChange={(e) => callback(e)}
				value={currentValue}
				rows={rows || 5}
			/>
		</>
	);
}
