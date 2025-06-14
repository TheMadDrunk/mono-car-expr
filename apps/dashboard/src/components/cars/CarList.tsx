import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services/carService';
import CarCard from './CarCard';

const CarList: FC = () => {
    const { data: cars, isLoading, error } = useQuery({
        queryKey: ['cars'],
        queryFn: carService.getAll
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Error loading cars. Please try again later.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars?.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarList; 