import axios from 'axios';

const ORDER_SERVICE_URL = 'http://localhost:3002/api/orders'; 

export const connectToOrderService = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
    try {
        const response = await axios({
            url: `${ORDER_SERVICE_URL}/${endpoint}`,
            method,
            data,
        });
        console.log('Response from Order Service:', response.data);
        if (!response || !response.data) {
            throw new Error('Invalid response from Order Service');
        }
        return response.data;
    } catch (error) {
        console.error('Error connecting to Order Service:', error);
        throw error;
    }
};