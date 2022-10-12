const fetchWorkbooks = async () => {
	const address = import.meta.env.PROD ? `/api/workbooks/` : "https://csdt.org/api/workbooks/";
	const res = await fetch(address);

	return res.json();
};

export default fetchWorkbooks;
