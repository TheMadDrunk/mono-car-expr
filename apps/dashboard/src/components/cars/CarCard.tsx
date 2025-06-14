import type { FC } from 'react';
import type { Car } from '@repo/shared-types';

interface CarCardProps {
    car: Car;
}

const CarCard: FC<CarCardProps> = ({ car }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
                    <p className="text-gray-600">{car.model}</p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                    {car.matricule}
                </span>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Technical Visit</span>
                    <span className="text-gray-900">{new Date(car.lastVisiteTechnique).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rental Days</span>
                    <span className="text-gray-900">{car.rentalDays} days</span>
                </div>
            </div>
        </div>
    );
};

export default CarCard; 