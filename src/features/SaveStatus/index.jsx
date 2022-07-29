import { useSelector } from "react-redux";

export default function SaveStatus() {
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) == null;
	const lastSaved = useSelector((state) => state.workbookState.data.last_saved);

	return (
		<>
			{isUserLoggedIn ? (
				<strong key="test">
					<p className="mb-0 figure-caption">Login to save your work.</p>
				</strong>
			) : (
				<>
					{saveStatus ? (
						<p className="mb-0 figure-caption" key="test">
							{lastSaved}
						</p>
					) : (
						<strong key="test">
							<p className="mb-0 figure-caption">You have unsaved changes</p>
						</strong>
					)}
				</>
			)}
		</>
	);
}
