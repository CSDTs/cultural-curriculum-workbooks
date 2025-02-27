import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, chakra, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

import { FaChevronDown, FaUserAlt } from "react-icons/fa";
import { VscChevronDown } from "react-icons/vsc";

import { LoginPrompt, LogoutPrompt } from "@/components/organisms/authentication";

import useAuth from "@/hooks/useAuth";

const UserMenu = () => {
	const { currentLoggedInUser } = useAuth();
	const { id, username } = currentLoggedInUser;

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
				<div className="flex gap-3 lg:items-center items-start sm:w-full lg:w-auto lg:flex-row flex-col">
					<a className="lg:text-sm font-medium text-base" href={"/accounts/signup/"}>
						Sign Up
					</a>
					<LoginPrompt isNavLogin={true} />
				</div>
			)}
		</>
	);
};

export default UserMenu;
