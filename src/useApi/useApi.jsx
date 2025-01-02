import React, { useState } from 'react';
import axios from 'axios';

const useApi = () => {
const BaseUrl = import.meta.env.VITE_BACKEND_URL;
const [data, setData] = useState([]);
const [err, setErr] = useState(null);

    
    
    
    
    
    
    
    
    
    
    
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

    
    
    
    
    
    
    
    
    
    
    const addData = async (endPoint, newData) => {
        console.log("form data is",newData)
        try {
            const response = await axios.post(`${BaseUrl}/${endPoint}`, newData);
            setData((prevData) => [...prevData, response.data]);
            console.log(response)
            return response; 
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Error adding data';
            setErr(errorMessage);
            console.error('Error adding data:', errorMessage);
            throw error;
        }
    };

    





const updateData = async (endPoint, id, updatedData) => {
        try {
            const response = await axios.put(`${BaseUrl}/${endPoint}/${id}`, updatedData);
            setData((prevData) =>
                prevData.map((item) => (item.id === id ? response.data : item))
            );
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error updating data');
            console.log(error.message);
        }
    };

   





    
const deleteData = async (endPoint, id) => {
        try {
            await axios.delete(`${BaseUrl}/${endPoint}/${id}`);
            fetchData(endPoint)
        } catch (error) {
            setErr(error.response ? error.response.data.message : 'Error deleting data');
            console.log(error.message);
        }
    };
    
  
    




const UploadImage = async (endPoint, formData) => {
    if (!formData) {
        console.error("No form data provided for image upload");
        throw new Error("No form data provided for image upload");
    }

    try {
        
        for (let [key, value] of formData.entries()) {
            console.log('FormData entry:', key, value);
        }

        const response = await axios.post(`${BaseUrl}/${endPoint}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        
        if (response && response.data) {
            console.log("Server response:", response.data);
            
          
            setData(prevData => {

                const currentData = Array.isArray(prevData) ? prevData : [];
                return [...currentData, response.data];
            });
            
            return response.data;
        } else {
            throw new Error('Invalid response format from server');
        }
    } catch (error) {
        console.error('Error uploading image:', error);

        if (error.response && error.response.data) {
            console.error('Server error response:', error.response.data);
            throw new Error(error.response.data.message || 'Upload failed');
        }
        throw new Error(error.message || 'An error occurred during the upload');
    }
};
    return { data, err, fetchData, addData, updateData, deleteData,findData,UploadImage };
}; 


export default useApi;