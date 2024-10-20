

import React, { useState, useEffect } from 'react';
import { ChevronDown, Upload, Users } from 'lucide-react';
import useApi from '../../useApi/useApi';

export const CategoryUpdateForm = ({ navbar, setActive }) => {
    const { updateData, findData } = useApi();
    const [formData, setFormData] = useState({
        CategoryName: '',
        Status: '',
        Description: ''

    });

    const [fileName, setFileName] = useState('No file chosen');

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await findData(`NavBar/view`, navbar._id);
                if (response && response.data) {
                    setFormData({
                        CategoryName: response.data.CategoryName || '',
                        Status: response.data.Status || '',
                        Description: response.data.Description || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategoryData();
    }, [navbar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateData('NavBar/update', navbar._id, formData); // Update with correct endpoint
            console.log('Category updated successfully');
            setActive(0); // Close the form after submission
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-6">Edit Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['CategoryName', 'Description'].map((key) => (
                    <div key={key}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue"
                        />
                    </div>
                ))}
                
                <div>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700 mb=1">Status</label>
                    <select
                        id="Status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        className="w-full px=3 py=2 border border-gray=300 rounded-md focus:outline-none focus:ring=focus:ring-blue appearance-none"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <ChevronDown className="absolute right=3 top=1/2 transform -translate-y=1/2 h=5 w=5 text-gray=400" />
                </div>

                {/* Optional File Upload Field */}
                {/* Uncomment if needed */}
                {/* 
                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray=700 mb=1">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="w-full px=3 py=2 border border-gray=300 rounded-md focus:outline-none focus:ring=focus:ring-blue"
                    />
                    <p>{fileName}</p>
                </div> 
                */}
            </div>

            <div className="mt=8 flex justify-end space-x=4">
                <button type='button' onClick={() => setActive(0)} 
                        className='px=4 py=2 border border-gray=300 rounded-md shadow-sm text-sm font-medium text-gray=700 bg-white hover:bg-gray=50'>
                    Cancel
                </button>

                <button type='submit' 
                        className='px=4 py=2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'>
                    Submit
                </button>
            </div>

        </form>
    );
};




