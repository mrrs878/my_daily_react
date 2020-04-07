import React, { ErrorInfo } from 'react';

interface MErrorBoundaryState {
  hasError: boolean;
}

class MErrorBoundary extends React.Component<{}, MErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDeriveStateFromError(): MErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // You can also log the error to an error reporting refund
    console.log('Error::::', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>OOPS!. WE ARE LOOKING INTO IT.</h1>;
    }
    return this.props.children;
  }
}

export default MErrorBoundary;
