import { Stack, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

import MobileNavItem from "./MobileNavItem";

const MobileNav = ({ data }) => {
	return (
		<Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
			{data.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

MobileNav.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MobileNav;
