import { useEffect, useState } from 'react';
import useApi from '../../useApi/useApi';

export default function ContentUpdateForm({ active, setActive, handleUpdate, content, onUpdate }) {
    const { findData, updateData, fetchData } = useApi();

    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        VendorName: '',
        ContentType: '',
        ContentStatus: '',
        Title:'',
        
        Description: ''
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await findData(`Content/management/view`, content._id);
                const vendorManagementResponse = await fetchData('Vendor/vendors');
                const data = vendorManagementResponse.data.Data;
                setVendors(data);
                
                if (response.data.Users) {
                    setFormData(response.data.Users);
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchServiceData();
    }, [content]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setActive(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateData('Content/management/update', content._id, formData);
            console.log('Form submitted:', formData);
            onUpdate(formData); 
            setActive(0); 
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            VendorName: '',
            contentType: '',
            ContentStatus: '',
            Title:'',
            
            Description: ''
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enter content Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="VendorName" className="block text-lg font-medium text-gray-700 mb-2">Name List</label>
                        <select
                            id="VendorName"
                            name="VendorName"
                            value={formData.VendorName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Names</option>
                            {vendors.map((vendor) => (
                                <option key={vendor._id} value={vendor.VendorName}>
                                    {vendor.VendorName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ContentType" className="block text-lg font-medium text-gray-700 mb-2">content Status</label>
                        <select
                            id="ContentType"
                            name="ContentType" // Ensure this matches your state variable
                            value={formData.ContentType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Content Type</option>
                            <option value="Text Content">Text Content</option>
                            <option value="Image Content">Image Content</option>
                            <option value="Video Content">Video Content</option>
                            <option value="Audio Content">Audio Content</option>
                            <option value="Document Content">Document Content</option>
                            <option value="HTML Content">HTML Content</option>
                            <option value="Interactive Content">Interactive Content</option>
                            <option value="Advertisement Content">Advertisement Content</option>
                            <option value="Product Content">Product Content</option>
                        </select>
                    </div>

                    <div>
                    <label htmlFor="Title" className="block text-lg font-medium text-gray-700 mb-2">Title</label>
                    <textarea
                        id="Title"
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        rows={1}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>


                    <div>
                        <label htmlFor="ContentStatus" className="block text-lg font-medium text-gray-700 mb-2">content Status</label>
                        <select
                            id="ContentStatus"
                            name="ContentStatus" // Ensure this matches your state variable
                            value={formData.ContentStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select content Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    
                </div>
                <div>
                    <label htmlFor="Description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        id="Description"
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Displaying content Status with Color Coding */}
                {/* {formData.ContentStatus && (
                    <div className={`mt-4 p-2 rounded-md ${formData.ContentStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Current Status: {formData.ContentStatus}
                    </div>
                )} */}

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}