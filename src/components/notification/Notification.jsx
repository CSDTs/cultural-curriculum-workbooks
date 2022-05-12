import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsSystem, { atalhoTheme, dismissNotification } from "reapop";

export default function Notification() {
	const dispatch = useDispatch();
	// 1. Retrieve the notifications to display.
	const notifications = useSelector((state) => state.notifications);

	return (
		<div>
			<NotificationsSystem
				// 2. Pass the notifications you want Reapop to display.
				notifications={notifications}
				// 3. Pass the function used to dismiss a notification.
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				// 4. Pass a builtIn theme or a custom theme.
				theme={atalhoTheme}
			/>
		</div>
	);
}
