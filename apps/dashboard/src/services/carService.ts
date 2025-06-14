import axios from 'axios';
import type { Car } from '@repo/shared-types';

const API_URL = '/api';

export const carService = {
    getAll: async (): Promise<Car[]> => {
        const { data } = await axios.get(`${API_URL}/cars`);
        return data;
    },

    getById: async (id: number): Promise<Car> => {
        const { data } = await axios.get(`${API_URL}/cars/${id}`);
        return data;
    }
}; 