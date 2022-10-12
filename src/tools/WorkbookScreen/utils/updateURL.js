export function updateURL(slug, id) {
	window.history.pushState({}, "", `/workbooks/start_${slug}/${id}/` + window.location.search);
}
