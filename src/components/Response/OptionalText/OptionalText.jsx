import styles from "./OptionalText.module.scss";
import { FaCheck } from "react-icons/fa";

export default function OptionalText({ title, placeholder, callback, currentValue }) {
	return (
		<>
			<h4 className="mt-5">
				{currentValue && <FaCheck className={styles.correct} />} {title}
			</h4>
			<textarea placeholder={placeholder} className="form-control" onChange={(e) => callback(e)} value={currentValue} />
		</>
	);
}
