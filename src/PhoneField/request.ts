import axios from 'axios';

export const url = 'https://customer.itiger.com/api/v1/account/field/country_group';

export const getCountries = (language?: string) => {
    const params = language ? { lang: language } : {};
    const axiosInstance = axios.create();

    return axiosInstance.get(url, { params });
};
