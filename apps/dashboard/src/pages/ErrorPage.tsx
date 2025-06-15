const ErrorPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                    Error
                </h1>
                <p className="text-xl text-gray-600">
                    An error occurred. Please try again.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;