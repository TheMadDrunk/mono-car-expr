import { useAuth } from '../hooks/useAuth';


const LoginPage: React.FC = () => {
    const { login } = useAuth();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Please Log In
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    You need to be logged in to access the car fleet.
                </p>
                <button
                    onClick={login}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors text-lg"
                >
                    Login with Authentik
                </button>
            </div>
        </div>
    );
};

export default LoginPage;