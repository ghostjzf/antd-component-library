import React, { ErrorInfo } from 'react';
import { Result } from 'antd';

class ErrorBoundary extends React.Component<{ error?: string }, { hasError: boolean; errorInfo: string }> {
    state = { hasError: !!this.props.error || false, errorInfo: '' };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorInfo: error.message };
    }

    static getDerivedStateFromProps(nextProps) {
        const { error } = nextProps;

        if (error) {
            return { hasError: true, errorInfo: error };
        }

        return null;
    }

    componentDidCatch(error: any, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.warn(error, errorInfo);
    }

    render() {
        const { error } = this.props;

        if (this.state.hasError) {
            return (
                <Result
                    status="error"
                    title={error ? error : '[jigsaw error]: Something went wrong.'}
                    extra={this.state.errorInfo}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
