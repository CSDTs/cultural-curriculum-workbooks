export function updateURL(id) {
	if (window.history !== undefined && window.history.pushState !== undefined) {
		let updatedPathname = window.location.pathname.replace(/\d+$/, `${id}`);
		if (updatedPathname === window.location.pathname) window.history.pushState({}, "", `${updatedPathname}${id}`);
		else window.history.pushState({}, "", updatedPathname);
	}
}
