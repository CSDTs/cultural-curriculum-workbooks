import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaQuestionCircle } from "react-icons/fa";

import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import "./Navigation.module.scss";

export default function Navigation() {
	const currentUser = useSelector((state) => state.workbookState.user);

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<img src="/src/img/nsf.gif" width="40" height="40" alt="" />
					<img src="/src/img/logo.svg" width="100" height="40" alt="" />
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
						<UserDropdown user={currentUser} />
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
