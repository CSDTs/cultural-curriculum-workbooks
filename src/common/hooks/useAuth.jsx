const useAuth = () => {
	const [id, setId] = useState(null);
	const [username, setUsername] = useState(null);

	const [user, setUser] = useLocalStorage("currentUser");

	useEffect(() => {
		if (!user) {
			authenticate().then((res) => {
				setId(res.data.id);
				setUsername(res.data.username);
				setUser(res.data);
			});
			return;
		}

		setId(user.id);
		setUsername(user.username);
	}, []);

	return {
		id,
		username,
	};
};
