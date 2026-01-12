import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary-fallback p-8 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-4">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            An error occurred while rendering this component. The page will continue to work, but this section may not display correctly.
          </p>
          {this.props.showDetails && (
            <details className="text-sm text-red-700">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;