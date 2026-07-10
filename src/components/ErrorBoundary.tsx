import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	fallback?: ReactNode;
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(error, errorInfo);
	}

	reset = () => {
		this.setState({ hasError: false });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) return this.props.fallback;

			return (
				<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-700 px-4">
					<div className="w-full max-w-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 text-center shadow-sm">
						<p className="text-gray-700 dark:text-white mb-4">
							Something went wrong — this may be a temporary network issue.
						</p>
						<div className="flex justify-center gap-3">
							<button
								onClick={this.reset}
								className="px-4 py-2 rounded-lg border dark:border-gray-600 border-gray-300 dark:text-white text-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-400">
								Try again
							</button>
							<button
								onClick={() => window.location.reload()}
								className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-400">
								Reload page
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
