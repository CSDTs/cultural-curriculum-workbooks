import { useSearchParams } from "react-router-dom";

function getSlug() {
	const [searchParams] = useSearchParams();
	if (typeof config !== "undefined") return config.slug;
	if (searchParams.get("wb")) return searchParams.get("wb");
	return null;
}

export default getSlug;
