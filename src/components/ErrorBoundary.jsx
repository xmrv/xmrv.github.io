import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error("HATA YAKALANDI:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Bir şeyler ters gitti 😕</h1>
            <p>{this.state.message}</p>

            <button
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl"
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
