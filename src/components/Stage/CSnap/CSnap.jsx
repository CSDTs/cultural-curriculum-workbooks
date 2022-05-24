import React from "react";
import styles from "../Stage.module.scss";

export default function CSnap() {
	return <iframe className={`w-100 shadow ${styles.csnapFrame}`} src="/static/csnap_pro/csdt/snap.html"></iframe>;
}
