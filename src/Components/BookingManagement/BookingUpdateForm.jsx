import { useEffect, useState } from 'react';
import useApi from '../../useApi/useApi';

export default function BookingUpdateForm({ active, setActive, handleUpdate, booking, onUpdate }) {
    const { findData, updateData, fetchData } = useApi();

    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        BookingType: '',
        BookingStatus: '', // Ensure this matches your select input name
        Date: '',
        Description: ''
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await findData(`booking/services/view`, booking._id);
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
    }, [booking]);

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
            await updateData('booking/services/update', booking._id, formData);
            console.log('Form submitted:', formData);
            onUpdate(formData); 
            setActive(0); 
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            Name: '',
            BookingType: '',
            BookingStatus: '',
            Date: '',
            Description: ''
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enter Booking Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="Name" className="block text-lg font-medium text-gray-700 mb-2">Name List</label>
                        <select
                            id="Name"
                            name="Name"
                            value={formData.Name}
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
                        <label htmlFor="bookingStatus" className="block text-lg font-medium text-gray-700 mb-2">Booking Status</label>
                        <select
                            id="bookingStatus"
                            name="BookingStatus" // Ensure this matches your state variable
                            value={formData.BookingStatus}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Booking Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Date" className="block text-lg font-medium text-gray-700 mb-2">Booking Date for</label>
                        <input
                            type="date"
                            id="Date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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

                {/* Displaying Booking Status with Color Coding */}
                {/* {formData.BookingStatus && (
                    <div className={`mt-4 p-2 rounded-md ${formData.BookingStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Current Status: {formData.BookingStatus}
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