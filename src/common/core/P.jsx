import { Text } from "@chakra-ui/react";

export default function P({ children, ...rest }) {
	return (
		<Text
			mb={5}
			textAlign={{
				base: "center",
				sm: "left",
			}}
			color={"gray.600"}
			_dark={{ color: "gray.400" }}
			fontSize={{ md: "lg" }}
			{...rest}>
			{children}
		</Text>
	);
}
