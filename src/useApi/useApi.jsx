import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);

    // Fetch data from the backend
    const fetchData = async (endPoint, ) => {
        try {
            const response = await axios.get(`${BaseUrl}/${endPoint}`);
            
            console.log(response)
            setData(response);
            return response;
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error fetching data');
            console.log(error.message);
        }
    };
    const findData = async (endPoint, userId) => {
        try {
            const response = await axios.get(`${BaseUrl}/${endPoint}/${userId}`);
            
            console.log(response)
            setData(response);
            return response;
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error fetching data');
            console.log(error.message);
        }
    };

    // Add new data
    // const addData = async (endPoint, newData) => {
    //     try {
    //         const response = await axios.post(`${BaseUrl}/${endPoint}`, newData);
    //         setData((prevData) => [...prevData, response.data]); // Update local state
    //     } catch (error) {
    //         setErr(error.response ? error.response.data.message : 'Error adding data');
    //         console.log(error.message);
    //     }
    // };
    const addData = async (endPoint, newData) => {
        console.log("form data is",newData)
        try {
            const response = await axios.post(`${BaseUrl}/${endPoint}`, newData);
            setData((prevData) => [...prevData, response.data]); // Update local state
            console.log(response)
            return response; // Return the response for the caller to use if needed
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Error adding data';
            setErr(errorMessage);
            console.error('Error adding data:', errorMessage);
            throw error; // Rethrow the error for the caller to handle if needed
        }
    };

    // Update existing data
    const updateData = async (endPoint, id, updatedData) => {
        try {
            const response = await axios.put(`${BaseUrl}/${endPoint}/${id}`, updatedData);
            setData((prevData) =>
                prevData.map((item) => (item.id === id ? response.data : item))
            ); // Update local state
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error updating data');
            console.log(error.message);
        }
    };

    // Delete data
    const deleteData = async (endPoint, id) => {
        try {
            await axios.delete(`${BaseUrl}/${endPoint}/${id}`);
            setData((prevData) => prevData.filter((item) => item.id !== id)); // Update local state
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error deleting data');
            console.log(error.message);
        }
    };

    return { data, err, fetchData, addData, updateData, deleteData,findData };
};

export default useApi;