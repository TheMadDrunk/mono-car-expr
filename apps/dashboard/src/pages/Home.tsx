import CarList from '../components/cars/CarList';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Car Fleet</h1>
            <CarList />
        </div>
    );
};

export default Home; 