import React from "react";

import { NavDropdown, Nav } from "react-bootstrap";
import { FaUser, FaRegUser } from "react-icons/fa";
import styles from "./Navigation.module.scss";

export default function UserDropdown({ user }) {
	const status = (
		<span>
			<FaUser className="mx-2" />
			{`${user.username}`}
		</span>
	);

	return (
		<>
			{user.username ? (
				<NavDropdown title={status} id="collapsible-nav-dropdown" className={`${styles.userDropdown} w-auto mx-0 px-0`}>
					<NavDropdown.Item href={`/users/${user.id}`}>My Projects</NavDropdown.Item>
					<NavDropdown.Item href={`/users/${user.id}/classes`}>My Classrooms</NavDropdown.Item>
					<NavDropdown.Item href={`/users/${user.id}/workbooks`}>My Workbooks</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="/accounts/logout">Not You? (LOGOUT)</NavDropdown.Item>
				</NavDropdown>
			) : (
				<>
					<Nav.Link href="/accounts/signup/">Sign Up</Nav.Link>
					<Nav.Link href="/accounts/login/">
						<FaRegUser className="me-2 ms-1" />
						Login
					</Nav.Link>
				</>
			)}
		</>
	);
}
