import { Heading, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import HomepageCard from "./HomepageCard";

const Homepage = () => {
	return (
		<section id="interactive-homepage" className="px-4">
			<Heading>Discrete Iteration</Heading>
			<Text fontWeight={400} color={useColorModeValue("gray.800", "gray.400")} mb={4}>
				Many cultural patterns are just repeating shapes. Great for beginners!
			</Text>

			<SimpleGrid columns={6} spacing={10}>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/quilting.jpg"}
					title={"Quilting"}
					link={"/culture/quilting/index.html"}
				/>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/cornrow_content_page_1_33BG3eo.png"}
					title={"Cornrow Curves"}
					link={"/culture/cornrowcurves/index.html"}
				/>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/stamps.jpg"}
					title={"Tooled Leather"}
					link={"/culture/tooledleather/index.html"}
				/>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/beadwork3_LC8NLYZ.jpg"}
					title={"Bead Loom"}
					link={"/culture/beadloom/index.html"}
				/>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/knitting.jpg"}
					title={"Yarn Art"}
					link={"/culture/yarnart/index.html"}
				/>
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/saya.jpg"}
					title={"Sci-Fi"}
					link={"/culture/scifi/index.html"}
				/>{" "}
				<HomepageCard
					thumbnail={"https://csdt.org/static/website/www/img/homepage/kenteComputing.jpg"}
					title={"Kente Computing"}
					link={"/culture/kentecomputing/index.html"}
				/>{" "}
				<HomepageCard
					thumbnail={"http://csdt.org/media/application_screenshot/thumb.png"}
					title={"Henna"}
					link={"/culture/henna/index.html"}
				/>
			</SimpleGrid>
		</section>
	);
};

export default Homepage;
