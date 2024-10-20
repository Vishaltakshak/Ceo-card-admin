import { useEffect, useState } from 'react';
import useApi from '../../useApi/useApi';

export default function InventoryUpdateForm({ active, setActive, onUpdate, booking }) {
    const { findData, updateData, fetchData } = useApi();

    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        BookingType: '',
        Availability: '', // Ensure this matches your select input name
        Pricing: '',
        Discount: '',
         CreationDate:''
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await findData(`Inventory/management/view`, booking._id);
                const vendorManagementResponse = await fetchData('Vendor/vendors');
                const data = vendorManagementResponse.data.Data;
                setVendors(data);
                console.log(response, booking._id)
                
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
            await updateData('Inventory/management/updated', booking._id, formData);
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
            Availability: '',
            Pricing: '',
            Discount: '',
             CreationDate:''
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enter Booking Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="Name" className="block text-lg font-medium text-gray-700 mb-2">Vendort</label>
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
                        <label htmlFor="Availability" className="block text-lg font-medium text-gray-700 mb-2">Availability</label>
                        <select
                            id="Availability"
                            name="Availability" // Ensure this matches your state variable
                            value={formData.Availability}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Booking Status</option>
                            <option value="Available">Available</option>
                            <option value="UnAvailable">UnAvailable</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Pricing" className="block text-lg font-medium text-gray-700 mb-2"> Pricing</label>
                        <input
                            type="Pricing"
                            id="Pricing"
                            name="Pricing"
                            value={formData.Pricing}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">Booking CreationDate for</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.CreationDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="Discount" className="block text-lg font-medium text-gray-700 mb-2">Discount</label>
                    <textarea
                        id="Discount"
                        name="Discount"
                        value={formData.Discount}
                        onChange={handleChange}
                        rows={1}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Displaying Booking Status with Color Coding */}
                {/* {formData.Availability && (
                    <div className={`mt-4 p-2 rounded-md ${formData.Availability === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Current Status: {formData.Availability}
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