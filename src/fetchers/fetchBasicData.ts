const fetchBasicData = async <T>(address: string): Promise<T> => {
	const res = await fetch(address);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
};
export default fetchBasicData;
