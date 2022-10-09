import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const NamePlate = () => {
	const { title } = useSelector((state) => state.workbookState.workbook);
	const { name: chosenClassroom } = useSelector((state) => state.workbookState.user.selected_classroom);

	return (
		<Flex px="4" py="5" align="left" direction={"column"}>
			<Text
				fontSize="2xl"
				ml="2"
				color="brand.500"
				_dark={{
					color: "white",
				}}
				fontWeight="semibold">
				{title}
			</Text>
			{import.meta.env.DEV && (
				<Text fontSize="md" ml="2" color={useColorModeValue("gray.800", "gray.400")} fontWeight="400">
					Development Mode
				</Text>
			)}
			{chosenClassroom && (
				<Text fontSize="md" ml="2" color={useColorModeValue("gray.800", "gray.400")} fontWeight="400">
					{chosenClassroom.name}
				</Text>
			)}
		</Flex>
	);
};

NamePlate.propTypes = {
	title: PropTypes.string,
	chosenClassroom: PropTypes.object,
};
export default NamePlate;
