import getSlug from "./getSlug";

const updateURL = (id: number) => {
	const slug = getSlug();

	window.history.pushState({}, "", `/workbooks/start_${slug}/${id}/` + window.location.search);
};

export default updateURL;
