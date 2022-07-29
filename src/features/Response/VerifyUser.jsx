import { useSelector } from "react-redux";

export default function VerifyUser() {
	const user = useSelector((state) => state.workbookState.user.username);

	return (
		<>
			{user != "" && (
				<>
					<p className="mb-0">It looks like you are signed in as:</p>
					<form>
						<div className="form-group">
							<input
								className="form-control form-control-lg interactive-login-field"
								type="text"
								placeholder="e.g. coolname123"
								disabled
								value={user}
							/>
						</div>
					</form>

					<div className="row justify-content-around py-2">
						<div className="col-6">
							<button type="button" className="btn btn-secondary w-100" data-toggle="modal" data-target="#loginModal">
								Not you? Sign in here
							</button>
						</div>
						<div className="col-6">
							<button type="button" className="btn btn-primary w-100" id="interactive-verification">
								Is this you? Verify your login here
							</button>
						</div>
					</div>
					<strong>
						<p>If are signed up, signed in, or verified your login status, you can move on to the next lesson.</p>
					</strong>
				</>
			)}

			{user == "" && (
				<>
					<p>If you have an account, please login so you can save your work.</p>
					<button type="button" className="btn btn-primary w-100" id="interactive-verification">
						Login to verify
					</button>
				</>
			)}
		</>
	);
}
