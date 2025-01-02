import {  useState } from 'react';
import useApi from '../../useApi/useApi';

export default function AddNewVendorManagementForm({ page, showForm }) {
  const { addData, UploadImage } = useApi();

  const [formData, setFormData] = useState({
    VendorName: '',
    VendorCategory: '',
    ContactName: '',
    ContactMail: '',
    ContactNumber: '',
    VendorAddress: '',
    VendorAmenities: '',
    VendorImages: '',
    VendorDescription: '',
    VendorWebsite: '',
    VendorRating: '',
    VendorStatus: 'Active',
    VendorOpenHours: '',
    VendorPricingInfo: {
      Currency: '',
      PriceRange: {
        Min: 0,
        Max: 0,
      },
    },
    MapUrl:''
  });


  

const handleUserUpdate = async( updatedUser) => {
   
    const {
        VendorName,
        VendorCategory,
        ContactName,
        ContactMail,
        ContactNumber,
        VendorAddress,
        VendorAmenities,
       
        VendorImages,
        VendorDescription,
        VendorWebsite,
        VendorRating,
        VendorStatus,


        VendorOpenHours,
        VendorPricingInfo,
        MapUrl
      } = updatedUser; // Destructure relevant data
  
      const sanitizedData = {
        VendorName,
        VendorCategory,
        ContactName,
        ContactMail,
        ContactNumber,
        VendorAddress,
        VendorAmenities,
        VendorImages,
        VendorDescription,
        VendorWebsite,
        VendorRating,
        VendorStatus,
        VendorOpenHours,
        VendorPricingInfo,
        MapUrl,
      };
      try {
        await addData('Vendor/add', sanitizedData);
        console.log('Vendor updated successfully');
        console.log("formdata is", formData)
        showForm(0);
      } catch (error) {
        console.error('Error updating vendor:', error);
      }
  
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var ImgUrl =null
      try {
        const ImageData = new FormData;
        if(!formData.VendorImages){
          console.log("no image file")
        }else{
          ImageData.append("image",formData.VendorImages)
        }
      const response = await UploadImage('Vendor/upload',ImageData)
      console.log(response)
     
      if (response?.fileUrl) {
        ImgUrl = await response.fileUrl;
        console.log("img urk",ImgUrl)
      } else {
        throw new Error('Failed to retrieve uploaded image URL');
      }
        
      } catch (error) {
        console.log(error)
        
      }
    
      const formPayLoad ={...formData, VendorImages:ImgUrl} 
      await addData('Vendor/add', formPayLoad);
      console.log('Vendor updated successfully');
      console.log("formdata is", formPayLoad)
      
      showForm(0);
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0]; 
  
    if (!file) {
      alert("Please add a photo");
      return;
    }
  

    const maxSizeInBytes = 15 * 1024 * 1024; 
    if (file.size > maxSizeInBytes) {
      alert("Photo is too large. Must be less than 15MB.");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      VendorImages: file,
    }));
  };
  

  const handlePricingChange = (field, value) => {
    setFormData((prevState) => {
      if (field === 'Currency') {
        // Update Currency directly
        return {
          ...prevState,
          VendorPricingInfo: {
            ...prevState.VendorPricingInfo,
            Currency: value,
          },
        };
      } else {
        // Update PriceRange fields (Min or Max)
        return {
          ...prevState,
          VendorPricingInfo: {
            ...prevState.VendorPricingInfo,
            PriceRange: {
              ...prevState.VendorPricingInfo.PriceRange,
              [field]: Number(value), // Ensure the value is converted to a number
            },
          },
        };
      }
    });
  };
  




 

  const handleCancel = () => {
    showForm(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-blue-500">Enter Vendor Details</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="VendorName" className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
            <input
              type="text"
              id="VendorName"
              name="VendorName"
              value={formData.VendorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="VendorCategory" className="block text-sm font-medium text-gray-700 mb-1">Vendor Category</label>
            <select
              id="VendorCategory"
              name="VendorCategory"
              value={formData.VendorCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option value="Hotel">Hotel</option>
              <option value="Travel">Travel</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div>
            <label htmlFor="ContactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
            <input
              type="text"
              id="ContactName"
              name="ContactName"
              value={formData.ContactName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {/* Additional fields for email, phone number, etc. */}
          <div>
            <label htmlFor="ContactMail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input
              type="email"
              id="ContactMail"
              name="ContactMail"
              value={formData.ContactMail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="ContactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="tel"
              id="ContactNumber"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
             <label htmlFor="VendorWebsite" className="block text-sm font-medium text-gray-700 mb-1">Vendor Website</label>
             <input type="url" id="VendorWebsite" name="VendorWebsite" value={formData.VendorWebsite} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
           </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label htmlFor="VendorDescription" className="block text-sm font-medium text-gray-700 mb-1">Vendor Description</label>
             <textarea id="VendorDescription" name="VendorDescription" value={formData.VendorDescription} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
           </div>
           <div>
             <label htmlFor="VendorAddress" className="block text-sm font-medium text-gray-700 mb-1">Vendor Address</label>
             <textarea id="VendorAddress" name="VendorAddress" value={formData.VendorAddress} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
           </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
             <label htmlFor="VendorRating" className="block text-sm font-medium text-gray-700 mb-1">Vendor Rating</label>
             <input type="string" id="VendorRating" name="VendorRating" value={formData.VendorRating} onChange={handleChange} min="0" max="5" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
           </div>
           <div>
             <label htmlFor="VendorImages" className="block text-sm font-medium text-gray-700 mb-1">Vendor Images</label>
             <div className="flex items-center">
               <label htmlFor="VendorImages" className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary">
                 Choose Files
               </label>
               <span className="ml-3 text-sm text-gray-500">
                {formData.VendorImages instanceof File ? formData.VendorImages.name : 'Choose file'}
              </span>
               <input type="file" id="VendorImages" name="VendorImages" onChange={handleImageUpload} className="hidden" />
             </div>
           </div>
        </div>

        {/* Open Hours Section */}
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Vendor Open Hours</h2>
            <textarea
              id="VendorOpenHours"
              name="VendorOpenHours"
              value={formData.VendorOpenHours}
              onChange={handleChange}
              rows={3}
              placeholder="Enter open hours (e.g., Monday to Friday: 9 AM - 5 PM)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>


        {/* Pricing Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Vendor Pricing Info</h2>
          {/* Currency Input */}
          <input
            type="text"
            id="Currency"
            name="Currency"
            placeholder='Currency'
            value={formData.VendorPricingInfo.Currency}
            onChange={(e) => handlePricingChange('Currency', e.target.value)}
            className='flex-grow px-3 py-2 border border-gray-300 rounded-md'
          />
          {/* Price Range Inputs */}
          <input
            type='number'
            placeholder='Min Price'
            value={formData.VendorPricingInfo.PriceRange.Min}
            onChange={(e) => handlePricingChange('Min', e.target.value)}
            className='flex-grow px-3 py-2 border border-gray-300 rounded-md'
          />
          <input
            type='number'
            placeholder='Max Price'
            value={formData.VendorPricingInfo.PriceRange.Max}
            onChange={(e) => handlePricingChange('Max', e.target.value)}
            className='flex-grow px-3 py-2 border border-gray-300 rounded-md'
          />
        </div>

        {/* Location Coordinates Section */}
        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-4'>Map Url</h2>
          {/* Latitude Input */}
          <input
            name='MapUrl'
            type='string'
            placeholder='Url'
            value={formData.MapUrl}
            onChange={handleChange}
            className='flex-grow px-3 py-2 border border-gray-300 rounded-md'
          />
          </div>
         
        <div>
          <label htmlFor="VendorStatus" className="block text-sm font-medium text-gray-700 mb-1">Vendor Status</label>
          <select id="VendorStatus" name="VendorStatus" value={formData.VendorStatus} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
           <div className="flex space-x-4">
             <button onClick={handleUserUpdate} type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
               Submit
             </button>
             <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
               Cancel
             </button>
           </div>

        {/* Submit Button */}
       
      </form>
    </div>
  );
}


