import useLocalStorage from "../hooks/useLocalStorage";

const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";

const authenticateCloud = async () => {
	const address = ROOT_URL + import.meta.env.VITE_USERS_API;
	const response = await fetch(address);
	const data = await response.json();

	if (data?.id == null) throw new Error("User is not currently logged in");

	return { data, status: response.status };
};

const authenticateLocal = async () => {
	const testData = { id: 12776, username: "test", first_name: "", last_name: "" };
	return { data: testData, status: 200 };
};

const authenticate = async () => {
	if (import.meta.env.DEV) return authenticateLocal();
	return authenticateCloud();
};

async function getUser() {
	const [user, setUser] = useLocalStorage("currentUser");

	if (user) return user;

	return authenticate().then((res) => {
		return res.data;
	});
}

export { authenticate };
