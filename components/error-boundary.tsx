import React from "react";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <ThemedText type="title" style={{ marginBottom: 10 }}>
            Something went wrong.
          </ThemedText>
        </ThemedView>
      );
    }

    return this.props.children;
  }
}
