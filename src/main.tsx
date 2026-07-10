import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import { store } from "./setup/store";
const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
});
const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 2, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false },
	},
});
localStorage.theme = "dark";

if (localStorage.getItem("chakra-ui-color-mode") === "light") localStorage.removeItem("chakra-ui-color-mode");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<ErrorBoundary>
							<App />
						</ErrorBoundary>
					</QueryClientProvider>
				</Provider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
