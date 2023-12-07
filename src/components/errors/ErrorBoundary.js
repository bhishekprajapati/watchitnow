"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props?.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
