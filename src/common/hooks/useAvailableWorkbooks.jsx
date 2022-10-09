import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useAvailableWorkbooks = () => {
	const address = import.meta.env.PROD ? `/api/workbooks/` : "https://csdt.org/api/workbooks/";
	const { data, error } = useSWR(address, fetcher);

	return {
		workbooks: data,
		isLoading: !error && !data,
		isError: error,
	};
};

export default useAvailableWorkbooks;
