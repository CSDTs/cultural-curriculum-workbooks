import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCsrfToken, loginUser, getClassrooms } from "../../../../utils/apiRequests";
import styles from "./LoginPrompt.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setCurrentUser, setUserClassrooms } from "../../../../slices/workbookSlice.js";
import { notify } from "reapop";

import { commonProps } from "../../../../utils/notificationProps";
export default function LoginPrompt() {
	const [show, setShow] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const logThemIn = () => {
		loginUser().then((res) => {
			dispatch(setCurrentUser(res.data));
			// dispatch(notify(`Welcome back ${res.data.username}`, "info", commonProps));
			getClassrooms(res.data.id)
				.then((response) => {
					dispatch(setUserClassrooms(response.data));
				})
				.catch((error) => console.error(error));
		});
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow} size="sm">
				Login to Save
			</Button>

			<Modal show={show} onHide={handleClose} className={styles.signInPrompt} centered>
				<Modal.Header className={styles.header}>
					<Modal.Title>Welcome back!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{loggingIn ? (
						<div className="row justify-content-center">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : (
						<>
							<Form id="loginForm">
								<Form.Group className="mb-3" controlId="formUsername">
									<Form.Control type="text" placeholder="Username" />
								</Form.Group>

								<Form.Group className="mb-3" controlId="formPassword">
									<InputGroup className="mb-3">
										<Form.Control type={passwordShown ? "text" : "password"} placeholder="Password" />
										<InputGroup.Text id="basic-addon1" onClick={() => togglePassword()}>
											{passwordShown ? <FaEyeSlash /> : <FaEye />}
										</InputGroup.Text>
									</InputGroup>
								</Form.Group>
								<div className="row justify-content-between">
									<Form.Group className="mb-3" controlId="formBasicCheckbox" as={Col}>
										<Form.Check type="checkbox" label="Remember me" />
									</Form.Group>
									<Form.Group className="mb-3" controlId="formBasicCheckbox" as={Col}>
										<p className={styles.forgotPassword}>
											<strong>
												<a href="/accounts/password/reset/">Forgot your password?</a>
											</strong>
										</p>
									</Form.Group>
								</div>
							</Form>

							<Button onClick={logThemIn} className={`${styles.loginBtn} btn-block w-100`}>
								Login
							</Button>
						</>
					)}
				</Modal.Body>
				<Modal.Footer className={styles.footer}>
					<p>
						Don't have an account?{" "}
						<strong>
							<a href="/accounts/signup/">Sign Up</a>
						</strong>
					</p>
				</Modal.Footer>
			</Modal>
		</>
	);
}
