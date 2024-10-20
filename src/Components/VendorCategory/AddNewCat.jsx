import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useApi from '../../useApi/useApi';

export const AddNewCat = ({ page, showForm }) => {
    const { addData } = useApi();
    const [formData, setFormData] = useState({
        CategoryName: '',
        Status: 'Active', // Default value
        Description: ''
    });

    const [fileName, setFileName] = useState('No file chosen');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await addData('NavBar/add', formData); 
    //         console.log('Category updated successfully');
    //         showForm(0); 
    //     } catch (error) {
    //         console.error('Error updating category:', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
      
       
      
        const formPayload = new FormData();
        
        Object.keys(formData).forEach(key => {
            formPayload.append(key, formData[key]);
          
        });
      
        try {
          console.log('Submitting form data:', Object.fromEntries(formPayload));
          console.log("response is", formPayload)
          const response = await addData('NavBar/add', Object.fromEntries(formPayload));
      
          if (response && response.data) {
            console.log('New user added successfully', response.data);
            alert('User added successfully!');
           
            showForm(0);
          } else {
            console.error('Error: Response or response.data is undefined');
           
          }
        } catch (error) {
          console.error('Error submitting data:', error);
          
        }
      };

      const handleCancel = () => {
        showForm(0);
        console.log(page)
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
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="Status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue appearance-none"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button type='button' onClick={handleCancel} 
                        className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                    Cancel
                </button>

                <button type='submit' 
                        className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'>
                    Submit
                </button>
            </div>
        </form>
    );
};