import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, chakra, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

import { FaChevronDown, FaUserAlt } from "react-icons/fa";
import { VscChevronDown } from "react-icons/vsc";

import { LoginPrompt, LogoutPrompt } from "@/features/Authentication";

import useUser from "@/hooks/useUser";

const UserMenu = () => {
	const [id, username] = useUser();

	return (
		<>
			{username && (
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<VscChevronDown className="text-gray-500 dark:text-white" />}
						leftIcon={<FaUserAlt className="text-gray-500 dark:text-white" />}
						variant="ghost">
						<span className="px-1 hidden lg:flex text-gray-500 dark:text-white">{username}</span>
					</MenuButton>

					<MenuList className="!bg-white dark:!bg-gray-800 text-gray-500 dark:text-white">
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
						<MenuDivider className="border-gray-500 dark:border-white  " />
						<LogoutPrompt />
					</MenuList>
				</Menu>
			)}

			{!username && (
				<div className="flex gap-3 items-center">
					<Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
						Sign Up
					</Button>
					<LoginPrompt isNavLogin={true} />
				</div>
			)}
		</>
	);
};

export default UserMenu;
