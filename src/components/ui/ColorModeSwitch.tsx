import useDarkMode from "@/hooks/useDarkMode";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ColorModeSwitch() {
	const [colorTheme, setTheme] = useDarkMode();
	const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

	const toggleDarkMode = (checked) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	return (
		<div className="px-2">
			<DarkModeSwitch style={{ padding: "0.25rem" }} checked={darkSide} onChange={toggleDarkMode} size={30} />
		</div>
	);
}
