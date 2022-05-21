import React from "react";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { FaUser, FaQuestionCircle, FaRegUser } from "react-icons/fa";

import { useSelector } from "react-redux";

import "./Navigation.module.scss";

export default function Navigation(props) {
	let dropdown, status;

	const currentUser = useSelector((state) => state.workbookState.user);

	if (currentUser.username) {
		status = (
			<React.Fragment>
				<FaUser />
				<span> {currentUser.username}</span>
			</React.Fragment>
		);
		dropdown = (
			<NavDropdown title={status} id="collapsible-nav-dropdown" className="w-auto mx-0 px-0">
				<NavDropdown.Item href={`/users/${currentUser.id}`}>My Projects</NavDropdown.Item>
				<NavDropdown.Item href={`/users/${currentUser.id}/classes`}>My Classrooms</NavDropdown.Item>
				<NavDropdown.Item href={`/users/${currentUser.id}/workbooks`}>My Workbooks</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item href="/accounts/logout">Not You? (LOGOUT)</NavDropdown.Item>
			</NavDropdown>
		);
	} else {
		dropdown = (
			<React.Fragment>
				<Nav.Link href="/accounts/signup/">Sign Up</Nav.Link>
				<Nav.Link href="/accounts/login/">
					<FaRegUser className="me-2 ms-1" />
					Login
				</Nav.Link>
			</React.Fragment>
		);
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<img src="img/nsf.gif" width="40" height="40" alt="" />
					<img src="img/logo.svg" width="100" height="40" alt="" />
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/projects">Projects</Nav.Link>
						<Nav.Link href="/news">News</Nav.Link>
						<Nav.Link href="/publications">Publications</Nav.Link>
						<Nav.Link href="/about">About</Nav.Link>
					</Nav>
					<Nav className="justify-content-end">
						{dropdown}{" "}
						<Nav.Link className="help-divide d-none d-lg-block" disabled>
							{" "}
							|
						</Nav.Link>
						<Nav.Link href="/culture/help/index.html">
							<FaQuestionCircle className="me-2 ms-1" />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
