import { Box, chakra, Image } from "@chakra-ui/react";

export default function SoftwareCard({ title, image, handleOnClick, children }) {
	return (
		<Box role={"group"} h={"100%"} onClick={handleOnClick}>
			<Box
				mx="auto"
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				shadow="lg"
				rounded="lg"
				overflow="hidden"
				cursor="pointer"
				h={"100%"}
				w={"100%"}
				maxW={"sm"}
				_groupHover={{ borderBottom: "2px solid #1f89dd", transition: "0.1s" }}>
				<Image
					w="full"
					h={72}
					fit="cover"
					objectPosition="center"
					src={image}
					alt="avatar"
					_groupHover={{ borderTop: "2px solid #1f89dd", transition: "0.1s" }}
				/>

				<Box py={4} px={6}>
					<chakra.h1
						fontSize="xl"
						fontWeight="bold"
						color="gray.800"
						_dark={{
							color: "white",
						}}
						textAlign={"center"}>
						{title}
					</chakra.h1>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
