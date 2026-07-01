import { Component, type ErrorInfo, type ReactNode } from "react";
import Error500Page from "../pages/Error500Page";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorId: string;
};

export default class GlobalErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    errorId: "",
  };

  static getDerivedStateFromError() {
    return { hasError: true, errorId: crypto.randomUUID?.() ?? "unknown" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("GlobalErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error500Page errorId={this.state.errorId} />;
    }

    return this.props.children;
  }
}
