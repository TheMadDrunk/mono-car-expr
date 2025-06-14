import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '@repo/shared-types';

@Injectable()
export class CarsService {
    private readonly cars: Car[] = [
        {
            id: 1,
            name: 'Toyota',
            model: 'Corolla',
            matricule: '123ABC45',
            lastVisiteTechnique: new Date('2024-01-15'),
            rentalDays: 45,
        },
        {
            id: 2,
            name: 'Honda',
            model: 'Civic',
            matricule: '456DEF78',
            lastVisiteTechnique: new Date('2024-02-20'),
            rentalDays: 30,
        },
        {
            id: 3,
            name: 'BMW',
            model: 'X5',
            matricule: '789GHI01',
            lastVisiteTechnique: new Date('2024-03-10'),
            rentalDays: 60,
        },
        {
            id: 4,
            name: 'Mercedes',
            model: 'C-Class',
            matricule: '234JKL56',
            lastVisiteTechnique: new Date('2024-02-05'),
            rentalDays: 25,
        },
    ];

    findAll(): Car[] {
        return this.cars;
    }

    findOne(id: number): Car {
        const car = this.cars.find(car => car.id === id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }
} 