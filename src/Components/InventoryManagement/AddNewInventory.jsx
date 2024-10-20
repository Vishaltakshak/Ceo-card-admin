import { useEffect, useState } from 'react';
import useApi from '../../useApi/useApi';

export default function AddNewInventoryForm({ page, showForm }) {
    const { addData, fetchData } = useApi();

    const [vendors, setVendors] = useState([]);
    const [formData, setFormData] = useState({
        VendorName: '',
        Availability: '',
        Pricing: '',
        Discount: '',
        CreationDate: ''
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const vendorManagementResponse = await fetchData('Vendor/vendors');
                const data = vendorManagementResponse.data.Data;
                setVendors(data);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchServiceData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancel = () => {
        showForm(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addData('Inventory/management/add', formData);
            console.log('Form submitted:', formData);
            showForm(0); 
        } catch (error) {
            console.error('Error adding inventory:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            VendorName: '',
            Availability: '',
            Pricing: '',
            Discount: '',
            CreationDate: ''
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enter Inventory Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="VendorName" className="block text-lg font-medium text-gray-700 mb-2">Vendor</label>
                        <select
                            id="VendorName"
                            name="VendorName"
                            value={formData.VendorName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Vendor</option>
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
                            name="Availability"
                            value={formData.Availability}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Availability</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Pricing" className="block text-lg font-medium text-gray-700 mb-2">Pricing</label>
                        <input
                            type="number"
                            id="Pricing"
                            name="Pricing"
                            value={formData.Pricing}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="CreationDate" className="block text-lg font-medium text-gray-700 mb-2">Creation Date</label>
                        <input
                            type="date"
                            id="CreationDate"
                            name="CreationDate"
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