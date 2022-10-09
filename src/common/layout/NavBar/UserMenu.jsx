import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, chakra, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import useUser from "/src/common/hooks/useUser";
import { authenticate } from "/src/common/services/UserService";

const UserMenu = () => {
	const [id, username] = useUser();

	return (
		<>
			{username && (
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<FaUserAlt />} variant="ghost">
						<chakra.span px={1}>{username}</chakra.span>
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => {
								window.location.href = "/users/" + id;
							}}>
							My Projects
						</MenuItem>
						<MenuItem
							onClick={() => {
								window.location.href = "/users/" + id + "/classes";
							}}>
							My Classrooms
						</MenuItem>
						<MenuItem
							onClick={() => {
								window.location.href = "/users/" + id + "/workbooks";
							}}>
							My Workbooks
						</MenuItem>
						<MenuDivider />
						<MenuItem
							onClick={() => {
								window.location.href = "/accounts/logout/";
							}}>
							Not you? (LOGOUT)
						</MenuItem>
					</MenuList>
				</Menu>
			)}

			{!username && (
				<>
					<Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
						Sign Up
					</Button>
					<Button
						display={{ base: "none", md: "inline-flex" }}
						fontSize={"sm"}
						fontWeight={600}
						variant="ghost"
						justifyContent={"space-between"}
						href={"#"}
						_hover={{
							bg: "gray.300",
						}}>
						<FaRegUser /> <chakra.span px={1}>Login</chakra.span>
					</Button>
				</>
			)}
		</>
	);
};

export default UserMenu;
