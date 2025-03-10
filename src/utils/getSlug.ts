import { useSearchParams } from "react-router-dom";

const getSlug = () => {
	const [searchParams] = useSearchParams();
	if (typeof config !== "undefined") return config.slug;
	if (searchParams.get("wb")) return searchParams.get("wb");
	return null;
};

export default getSlug;
