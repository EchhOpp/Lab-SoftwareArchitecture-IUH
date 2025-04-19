import axios from 'axios';
import axiosRetry from 'axios-retry';
import Bottleneck from 'bottleneck';
import CircuitBreaker from 'opossum';

const ORDER_SERVICE_URL = 'http://localhost:3002/api/orders'; 

// 
const limiter = new Bottleneck({
    minTime: 1000, // Thoi gian cho phép gửi request toi da 1 giay
    maxConcurrent: 1, // Thoi gian cho phép gửi bao nhiêu request cùng lúc
});

// Retry logic for axios requests
axiosRetry(axios, {
    retries: 3, // So lan retry toi da
    retryDelay: (retryCount) => {
        console.log(`Retrying request... Attempt ${retryCount}`);
        return retryCount * 1000; // Thoi gian delay giua cac lan retry
    },
    retryCondition: (error) => {
        return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
    },
    shouldResetTimeout: true,
});

const options = {
    timeout: 5000, // Thoi gian timeout cho request
    errorThresholdPercentage: 50, // Ty le loi toi da de bat dau tu choi request
    resetTimeout: 30000, // Thoi gian reset circuit breaker sau khi bat dau tu choi request
};

const breaker = new CircuitBreaker(async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
    const response = await axios({
        url: `${ORDER_SERVICE_URL}/${endpoint}`,
        method,
        data,
        timeout: 5000,
    });
    return response.data;
}, options);

breaker.on('open', () => {
    console.log('Circuit breaker is open. No requests will be sent to the Order Service.');
});
breaker.on('close', () => {
    console.log('Circuit breaker is closed. Requests will be sent to the Order Service.');
});
breaker.on('halfOpen', () => {
    console.log('Circuit breaker is half-open. Some requests will be sent to the Order Service.');
});


export const connectToOrderService = limiter.wrap( async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
    try {
        const response = await breaker.fire(endpoint, method, data);
        return response;
    } catch (error) {
        console.error('Error connecting to Order Service:', error);
        throw error;
    }
});